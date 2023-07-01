import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Image, RefreshControl, ScrollView } from 'react-native';
import { setSeason } from '@/src/store/action';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Eliminatoria } from "./Eliminatoria";

import { Lista } from "@/src/components/Lista";
import { Tabs } from "@/src/components/Tabs";

import { tempoJogo } from "@/src/Utils/TempoJogo";
import {
    getSeasons,
    torneioInfo,
    torneio,
    torneioJogos,
    torneioArtilheiros,
    torneioMataMata,
    torneioJogosAntes,
    torneioJogosDepois,
    torneioRodada,
} from '@/src/store/store';

export function Copa({mataMataString = 0}) {
    const [refreshing, setRefreshing] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [rodada, setRodada] = useState(0);
    const [mataMata, setMataMata] = useState(null);

    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchData = async (refresh = false) => {
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        try {
            const jogosPassado = await torneioJogosAntes(torneioId, season.id);
            const jogosFuturos = await torneioJogosDepois(torneioId, season.id);
            setRodada(await torneioRodada(torneioId, season.id));
            setMataMata(await torneioMataMata(torneioId, season.id));

            let jogosTodos = [
                ...(jogosPassado) ? jogosPassado?.events : [],
                ...(jogosFuturos) ? jogosFuturos?.events : [],
            ];

            if (jogosPassado && jogosPassado?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos);
            
            formatar(jogosTodos);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
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
        fetchData(true);
    };
    
    useEffect(() => {
        setRefreshing(true);
        fetchData();
    }, [torneioId]);

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
            <View style={styles.container}>
                <Lista data={jogos} renderItem={renderItem}/>
            </View>
        )
    };

    const recursiva = async (page, jogosTodos) => {
        let addJogos = [];

        const anteriorRodada = await torneioJogosAntes(torneioId, season.id, page);
        addJogos = [
            ...(anteriorRodada) ? anteriorRodada.events : [],
            ...jogosTodos,
        ];

        if (anteriorRodada && anteriorRodada.hasNextPage) {
            let anteriorRecursiva = await recursiva(page+1, addJogos);
            if (anteriorRecursiva.length > 0) addJogos = anteriorRecursiva;
        }

        return addJogos;
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

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {mataMata && <Eliminatoria item={mataMata[0].views} nome={mataMata[0].name}/>}
            {(tabs.length > 0) && rodada.round && <Tabs data={tabs} render={Rodadas} indexInicial={rodada.round}/>}
        </ScrollView>
    );
}
