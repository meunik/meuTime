
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { urlBase } from '@/src/store/api';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { TabView, SceneMap } from 'react-native-tab-view';
import { theme } from "@/src/global/styles/theme";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function TodosJogos() {
    useFocusEffect(() => {
        setBackgroundColorAsync(theme.colors.fundo);

        return () => {
            setBackgroundColorAsync(theme.colors.nav);
        };
    });

    const route = useRoute();
    const params = route.params;
    const buscaJogosAntes = params.buscaJogosAntes;
    const buscaJogosDepois = params.buscaJogosDepois;
    const buscaRodada = params.buscaRodada;
    const stringRodada = params.stringRodada;
    const buscaTorneio = params.buscaTorneio;

	const navigation = useNavigation();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const intervalo = useSelector(state => state.intervalo);
    const [torneio, setTorneio] = useState(null);
    const [rodada, setRodada] = useState(0);

    const [refreshing, setRefreshing] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [index, setIndex] = useState(0);
    const [fim, setFim] = useState(false);

    const fetchData = async () => {
        try {
            const jogosPassado = await buscaJogosAntes();
            const jogosFuturos = await buscaJogosDepois();
            setTorneio(await buscaTorneio());
            setRodada(await buscaRodada());

            let jogosTodos = [
                ...(jogosPassado) ? jogosPassado?.events : [],
                ...(jogosFuturos) ? jogosFuturos?.events : [],
            ];

            if (jogosPassado && jogosPassado?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'passado');
            if (jogosFuturos && jogosFuturos?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'futuro');

            formatar(jogosTodos);
            setIndex(1);
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
        console.log(formattedTabs);

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

    const renderItem = ({item}) => {
        return (
            <View style={styles.lista}>
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

    const Rodadas = ({jogos, rodadaNome, index}) => {
        return (
            <View style={styles.container}>
                <View style={styles.nomeRodada}>
                    {(index > 0) && <Icon name="chevron-left" size={30} color="#969696" style={styles.setasEsquerda} />}

                    <Text style={styles.txtInfo}>{rodadaNome}</Text>

                    {(index != tabs.length - 1) && <Icon name="chevron-right" size={30} color="#969696" style={styles.setasDoreita} />}
                </View>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={jogos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        )
    };

    const renderScene = SceneMap(
        Object.fromEntries(
            tabs.map((tab) => {
                return [
                    tab.key,
                    () => <Rodadas jogos={tab.content} rodadaNome={tab.title} index={tab.index}/>,
                ]
            })
        )
    );

    const recursiva = async (page, jogosTodos, passadoOuFuturo = 'passado') => {
        let addJogos = [];

        if (passadoOuFuturo == 'passado') {
            const anteriorRodada = await buscaJogosAntes(page);
            addJogos = [
                ...anteriorRodada.events,
                ...jogosTodos,
            ];

            if (anteriorRodada?.hasNextPage) addJogos = await recursiva(page+1, addJogos, passadoOuFuturo);
        }
        
        if (passadoOuFuturo == 'futuro') {
            const proximaRodada = await buscaJogosDepois(page);
            addJogos = [
                ...jogosTodos,
                ...proximaRodada.events,
            ];

            if (proximaRodada?.hasNextPage) addJogos = await recursiva(page+1, addJogos, passadoOuFuturo);
        }

        return addJogos;
    };

    const changeIndex = (i) => {
        if (!fim) {
            setFim(true);
            setIndex(rodada?.round -1);
            setRefreshing(false);
        }
    };

    // return (<View style={{backgroundColor: '#000', flex: 1,}}></View>);

    return (
        <View style={styles.container}>
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

            {tabs &&
            <TabView
                navigationState={{ index: index, routes: tabs }}
                renderScene={renderScene}
                onIndexChange={changeIndex}
                renderTabBar={() => null}
            />}
        </View>
    );
}
