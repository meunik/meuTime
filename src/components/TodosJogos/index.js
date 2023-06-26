
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, ScrollView, RefreshControl } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { urlBase } from '@/src/store/api';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { TabView, SceneMap } from 'react-native-tab-view';
import { theme } from "@/src/global/styles/theme";
import { styles } from "@/src/global/styles/styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Lista } from "@/src/components/Lista";
import { Tabs } from "@/src/components/Tabs";

import { tempoJogo } from "@/src/Utils/TempoJogo";
import {
    torneioInfo,
    torneio as buscaTorneio,
    torneioJogos,
    torneioArtilheiros,
    torneioMataMata,
    torneioJogosAntes,
    torneioJogosDepois,
    torneioRodada,
} from '@/src/store/store';

export function TodosJogos() {
    useFocusEffect(() => {
        setBackgroundColorAsync(theme.colors.fundo);

        return () => {
            setBackgroundColorAsync(theme.colors.nav);
        };
    });

    const route = useRoute();
    const params = route.params;
    const mataMataString = params?.mataMataString || 0;

	const navigation = useNavigation();
    const torneioId = useSelector(state => state.torneioId);

    const [torneio, setTorneio] = useState(null);
    const [rodada, setRodada] = useState(0);
    const [refreshing, setRefreshing] = useState(true);
    const [tabs, setTabs] = useState([]);

    const fetchData = async () => {
        try {
            const jogosPassado = await torneioJogosAntes(torneioId);
            const jogosFuturos = await torneioJogosDepois(torneioId);
            setTorneio(await torneioInfo(torneioId));
            setRodada(await torneioRodada(torneioId));

            let jogosTodos = [
                ...(jogosPassado) ? jogosPassado?.events : [],
                ...(jogosFuturos) ? jogosFuturos?.events : [],
            ];

            if (jogosPassado && jogosPassado?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'passado');
            if (jogosFuturos && jogosFuturos?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'futuro');

            formatar(jogosTodos);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    };

    function stringRodada(valor) {
        if (mataMataString == 0) return `Rodada ${valor}`;

        switch (valor) {
            case '5': if (mataMataString >= 8) return 'Oitavas de Final';
            case '27': if (mataMataString >= 4) return 'Quartas de Final';
            case '28': if (mataMataString >= 2) return 'SemiFinal';
            case '29': if (mataMataString >= 1) return 'Final';
        
            default: return `Rodada ${valor}`;
        }
    };

    const formatar = (jogosTodos) => {
        let jogosPorRodadas = {};
        jogosTodos.forEach(jogo => {
            const round = jogo.roundInfo.round;
            
            if (!jogosPorRodadas[round]) {
                jogosPorRodadas[round] = [];
            }

            jogosPorRodadas[round].push(jogo);
        });

        const formattedTabs = Object.keys(jogosPorRodadas).map((itens, index) => ({
            index: index,
            key: `${itens}`,
            title: stringRodada(itens),
            content: jogosPorRodadas[itens],
        }));

        setTabs(formattedTabs);
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };
    
    useEffect(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.lista}>
                <View style={styles.timesUltimoJogo}>

                    <View style={styles.timeCasa}>
                        <View style={styles.cartaoVermelhoContainer}>
                            {item.homeRedCards && (() => {
                                const items = [];
                                for (let i = 0; i < item.homeRedCards; i++) {
                                    items.push(
                                        <Icon key={'homeRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartaoVermelho} />
                                    );
                                }
                                return items;
                            })()}
                        </View>
                        <Text style={styles.txtTime}>{item.homeTeam.nameCode}</Text>
                        <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${item.homeTeam.id}/image` }} />
                        <Text style={styles.txtTime}>{item.homeScore.display}</Text>
                    </View>

                    <Text style={styles.txtX}>x</Text>

                    <View style={styles.timeVisitante}>
                        <Text style={styles.txtTime}>{item.awayScore.display}</Text>
                        <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${item.awayTeam.id}/image` }} />
                        <Text style={styles.txtTime}>{item.awayTeam.nameCode}</Text>
                        <View style={styles.cartaoVermelhoContainer}>
                            {item.awayRedCards && (() => {
                            const items = [];
                            for (let i = 0; i < item.awayRedCards; i++) {
                                items.push(
                                    <Icon key={'awayRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartaoVermelho} />
                                );
                            }
                            return items;
                            })()}
                        </View>
                    </View>

                </View>
                <View style={styles.rodape}>
                    <Text style={styles.txtTempo}>{tempoJogo(item)}</Text>
                </View>
            </View>
        )
    };

    const Rodadas = (jogos) => {
        return (
            <ScrollView
                style={styles.containerFull}
                contentContainerStyle={styles.contentContainerStyle}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Lista data={jogos} renderItem={renderItem}/>
            </ScrollView>
        )
    };

    const recursiva = async (page, jogosTodos, passadoOuFuturo = 'passado') => {
        let addJogos = [];

        if (passadoOuFuturo == 'passado') {
            const anteriorRodada = await torneioJogosAntes(torneioId, page);
            addJogos = [
                ...(anteriorRodada) ? anteriorRodada.events : [],
                ...jogosTodos,
            ];
            
            if (anteriorRodada && anteriorRodada.hasNextPage) {
                let anteriorRecursiva = await recursiva(page+1, addJogos, passadoOuFuturo);
                if (anteriorRecursiva.length > 0) addJogos = anteriorRecursiva;
            }
        }
        
        if (passadoOuFuturo == 'futuro') {
            const proximaRodada = await torneioJogosDepois(torneioId, page);
            addJogos = [
                ...jogosTodos,
                ...(proximaRodada) ? proximaRodada.events : [],
            ];
            
            if (proximaRodada && proximaRodada.hasNextPage) {
                let proximaRecursiva = await recursiva(page+1, addJogos, passadoOuFuturo);
                if (proximaRecursiva.length > 0) addJogos = proximaRecursiva;
            }
        }

        return addJogos;
    };

    return (
        <View style={styles.containerFull}>
            <View style={styles.row}>
                <BaseButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-u-left-top-bold" size={30} color="#434343" style={styles.chevronDown} />
                </BaseButton>
                <View style={styles.info}>
                    {torneio && <>
                        <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneio.uniqueTournament?.id}/image/dark` }} />
                        <Text style={styles.txtInfo}>{torneio.uniqueTournament?.name}</Text>
                    </>}
                </View>
            </View>

            {(tabs.length > 0) && rodada.round && <Tabs data={tabs} render={Rodadas} indexInicial={rodada.round} id='jogos'/>}
        </View>
    );
}
