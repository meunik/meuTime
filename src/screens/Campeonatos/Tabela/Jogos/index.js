
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { brasileiraoJogosDepois, brasileiraoJogosAntes, brasileiraoRodada } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { theme } from "@/src/global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Lista } from "@/src/components/Lista";

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function Jogos() {
	const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const intervalo = useSelector(state => state.intervalo);
    const [rodada, setRodada] = useState(0);

    const [refreshing, setRefreshing] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [index, setIndex] = useState(0);
    const [fim, setFim] = useState(false);

    const fetchData = async () => {
        try {
            const jogosPassado = await brasileiraoJogosAntes();
            const jogosFuturos = await brasileiraoJogosDepois();
            setRodada(await brasileiraoRodada());

            let jogosTodos = [
                ...jogosPassado.events,
                ...jogosFuturos.events,
            ];

            if (jogosPassado?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'passado');
            if (jogosFuturos?.hasNextPage) jogosTodos = await recursiva(1, jogosTodos, 'futuro');

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
            title: `Rodada ${itens}`,
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

    const recursiva = async (page, jogosTodos, passadoOuFuturo = 'passado') => {
        let addJogos = [];

        if (passadoOuFuturo == 'passado') {
            const anteriorRodada = await brasileiraoJogosAntes(page);
            addJogos = [
                ...anteriorRodada.events,
                ...jogosTodos,
            ];

            if (anteriorRodada?.hasNextPage) addJogos = await recursiva(page+1, addJogos, passadoOuFuturo);
        }
        
        if (passadoOuFuturo == 'futuro') {
            const proximaRodada = await brasileiraoJogosDepois(page);
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 10,
        backgroundColor: theme.colors.fundo,
        // backgroundColor: theme.colors.background(),
        // backgroundColor: '#000000d9',
        // paddingHorizontal: 20,
    },

    containerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        paddingBottom: 12,
        backgroundColor: theme.colors.nav,
        // backgroundColor: '#590000',
        borderRadius: 10,
        position: 'absolute',
        left: 3,
        right: 3,
        bottom: -10,
        alignSelf: 'center',
    },
    labelStyle: {
        color: theme.colors.texto.nav,
    },
    navContainer: {
        width: 170,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 10,
    },
    ativo: {
        backgroundColor: '#000',
        alignSelf: 'center',
    },

    txtLogo: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[7],
    },
    txtData: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtTempo: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtX: {
        color: theme.colors.texto[300],
    },
    txtcampeonato: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtTime: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[6],
    },
    txtInfo: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
    },
    setasEsquerda: {
        position: 'absolute',
        left: 30,
    },
    setasDoreita: {
        position: 'absolute',
        right: 30,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 10,
    },
    img: {
        height: 50,
        width: 50,
    },
    logo: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    lista: {
        // borderColor: '#ffffff0d',
        borderColor: 'transparent',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    rodape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    jogo: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 10,
    },
    campeonato: {
        height: 60,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgCampeonato: {
        height: 50,
        width: 50,
    },
    jogoRolando: {
        height: 100,
        paddingBottom: 10,
    },
    timesUltimoJogo: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    times: {
        width: '100%',
        position: 'absolute',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    timeCasa: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 20,
        gap: 5,
    },
    timeVisitante: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    imgLista: {
        height: 40,
        width: 40,
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
    cartaoVermelho: {
        transform: [{ rotate: '90deg'}]
    },
    cartaoVermelhoContainer: {
        flexDirection: 'row',
        gap: -1,
    },
})
