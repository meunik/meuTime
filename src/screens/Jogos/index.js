import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { jogosDepois, proximoJogo, evento } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import moment from 'moment';
import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { setCarregarJogos, setIntervalo } from '@/src/store/action';

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function Jogos() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

	const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const intervalo = useSelector(state => state.intervalo);

    const [jogo, setJogo] = useState(null);
    const [futurosJogos, setFuturosJogos] = useState(null);
    const [jogoAnteriorSeguinte, setJogoAnteriorSeguinte] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchData() {
        const jogosFuturos = await jogosDepois(meuTime?.id);
        const jogoUltimoProx = await proximoJogo(meuTime?.id);
        const jogoAgora = await evento(jogoUltimoProx?.previousEvent?.id);

        setFuturosJogos(jogosFuturos);
        setJogo(jogoAgora);
        setJogoAnteriorSeguinte(jogoUltimoProx);

        if (jogoUltimoProx.previousEvent.status.type == 'inprogress') {
            const interval = setInterval(async () => {
                const jogoAtualizado = await evento(jogoAgora.id);
                setJogo(jogoAtualizado);
                if (jogoAtualizado.status.type != 'inprogress') {
                    clearInterval(interval);
                }
            }, 1000);
            dispatch(setIntervalo(interval))
        }
        clearInterval(intervalo);

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };
    
    useEffect(() => {
        if (carregarJogos) {
            setRefreshing(true);
            fetchData();
            dispatch(setCarregarJogos(false))
        }
    }, [carregarJogos]);

    const renderItem = ({ item, index }) => (
        <View style={styles.lista}>
            <View style={styles.topo}>
                <Text style={{ ...styles.txtcampeonato, color: item.tournament.uniqueTournament.secondaryColorHex }}>
                    {item.tournament.uniqueTournament.name}
                    {(item.tournament.id == 83)?` - ${item.roundInfo.round}ª Rodada`:''}
                </Text>
            </View>

            <View style={styles.jogo}>

                <View style={styles.campeonato}>
                    <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${item.tournament.uniqueTournament.id}/image/dark` }} />
                </View>
                <View style={styles.times}>

                    <View style={styles.timeCasa}>
                        <Text style={styles.txtTime}>{item.homeTeam.nameCode}</Text>
                        <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${item.homeTeam.id}/image` }} />
                    </View>

                    <Text style={styles.txtX}>x</Text>

                    <View style={styles.timeVisitante}>
                        <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${item.awayTeam.id}/image` }} />
                        <Text style={styles.txtTime}>{item.awayTeam.nameCode}</Text>
                    </View>

                </View>

            </View>
            <View style={styles.rodape}>
                <Text style={styles.txtData}>
                    {moment.unix(item.startTimestamp).format('DD/MM/YYYY')}
                    {' - '}
                    {moment.unix(item.startTimestamp).format('HH:mm')}
                </Text>
            </View>

        </View>
    );

    const jogoAtivo = () => (
        <View style={styles.jogoRolando}>
            <View style={styles.topo}>
                <Text style={{ color: jogo.tournament.uniqueTournament.secondaryColorHex, ...styles.txtcampeonato }}>
                    {`${jogo.tournament.uniqueTournament.name} - ${jogo.roundInfo.round}ª Rodada`}
                </Text>
            </View>
            <View style={styles.timesUltimoJogo}>

                <View style={styles.timeCasa}>
                    <View style={styles.cartaoVermelhoContainer}>
                        {jogo.homeRedCards && (() => {
                            const items = [];
                            for (let i = 0; i < jogo.homeRedCards; i++) {
                                items.push(
                                    <Icon key={'homeRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartaoVermelho} />
                                );
                            }
                            return items;
                        })()}
                    </View>
                    <Text style={styles.txtTime}>{jogo.homeTeam.nameCode}</Text>
                    <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                    <Text style={styles.txtTime}>{jogo.homeScore.display}</Text>
                </View>

                <Text style={styles.txtX}>x</Text>

                <View style={styles.timeVisitante}>
                    <Text style={styles.txtTime}>{jogo.awayScore.display}</Text>
                    <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                    <Text style={styles.txtTime}>{jogo.awayTeam.nameCode}</Text>
                    <View style={styles.cartaoVermelhoContainer}>
                        {jogo.awayRedCards && (() => {
                        const items = [];
                        for (let i = 0; i < jogo.awayRedCards; i++) {
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
                <Text style={styles.txtTempo}>{tempoJogo(jogo)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                {jogo && jogoAtivo()}
            </View>
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={futurosJogos}
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
