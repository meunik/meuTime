import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { brasileiraoJogosDepois, brasileiraoJogosAntes } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function Jogos() {
	const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const intervalo = useSelector(state => state.intervalo);

    const [futurosJogos, setFuturosJogos] = useState(null);
    const [passadoJogos, setPassadoJogos] = useState(null);
    const [todosJogos, setTodosJogos] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        const jogosFuturos = await brasileiraoJogosDepois();
        const jogosPassado = await brasileiraoJogosAntes();
        
        setFuturosJogos(jogosFuturos.events);
        setPassadoJogos(jogosPassado.events);
        setTodosJogos([
            ...jogosPassado.events,
            ...jogosFuturos.events,
        ]);

        let jogos = {};
        if (todosJogos) {
            todosJogos.forEach(jogo => {
                const round = jogo.roundInfo.round;
                
                if (!jogos[round]) {
                    jogos[round] = [];
                }
                
                jogos[round].push(jogo);
            });
        }
        // console.log(todosJogos);
        // console.log(jogos);

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };
    
    useEffect(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.lista}>
            <View style={styles.topo}>
                <Text style={{ color: item.tournament.uniqueTournament.secondaryColorHex, ...styles.txtcampeonato }}>
                    {`${item.tournament.uniqueTournament.name} - ${item.roundInfo.round}ª Rodada`}
                </Text>
            </View>
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
    );

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                {route.params && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${route.params.campeonato.uniqueTournament.id}/image/dark` }} />}
                <View>
                    <Text style={styles.txtInfo}>{route.params && route.params.campeonatoNome}</Text>
                </View>
            </View>
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={todosJogos}
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
    );
}
