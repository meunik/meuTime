import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { urlBase } from '@/src/store/api';
import { TabView, SceneMap } from 'react-native-tab-view';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Eliminatoria } from "./Eliminatoria";

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function Copa({
    buscaMataMata,
    buscaJogosAntes,
    buscaJogosDepois,
    buscaRodada,
    buscaTorneio,
    stringRodada,
    legenda = null,
    desabilitarGrupos = false,
    desabilitarMataMata = false,
    desabilitarBtnJogos = false,
    eliminatoriaVertical = 'horizontalLadoLado',
}) {
    const [refreshing, setRefreshing] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [index, setIndex] = useState(0);
    const [rodada, setRodada] = useState(0);
    const [fim, setFim] = useState(false);
    
    const [mataMata, setMataMata] = useState(null);

    const fetchData = async (refresh = false) => {
        try {
            const jogosPassado = await buscaJogosAntes();
            const jogosFuturos = await buscaJogosDepois();
            setRodada(await buscaRodada());
            setMataMata(await buscaMataMata());

            let jogosTodos = [
                ...jogosPassado.events,
                ...jogosFuturos.events,
            ];

            if (jogosPassado?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos);
            
            formatar(jogosTodos);
            if (refresh) {
                setRefreshing(false);
            } else {
                setIndex(1);
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(mataMata);

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

    const Rodadas = ({jogos, rodada, index}) => {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    {(index > 0) && <Icon name="chevron-left" size={30} color="#969696" style={styles.setasEsquerda} />}

                    <Text style={styles.txtInfo}>{rodada}</Text>

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
                    () => <Rodadas jogos={tab.content} rodada={tab.title} index={tab.index}/>,
                ]
            })
        )
    );

    const recursiva = async (page, jogosTodos) => {
        const anteriorRodada = await buscaJogosAntes(page);
        let addJogos = [
            ...anteriorRodada.events,
            ...jogosTodos,
        ];
            
        if (anteriorRodada?.hasNextPage) addJogos = recursiva(page+1, addJogos);

        return addJogos;
    };

    const changeIndex = (i) => {
        if (!fim) {
            setFim(true);
            setIndex(rodada?.round -1);
            setRefreshing(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* {mataMata && <Eliminatoria
                item={mataMata[0].views}
                nome={mataMata[0].name}
            />} */}
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
