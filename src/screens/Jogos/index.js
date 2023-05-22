import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { jogosDepois, proximoJogo, evento } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import moment from 'moment';
import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";

export function Jogos() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

    const [jogo, setJogo] = useState(null);
    const [futurosJogos, setFuturosJogos] = useState(null);
    const [jogoAnteriorSeguinte, setJogoAnteriorSeguinte] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // const fetchData = async () => {
    //     const proximosJogos = await jogosDepois();
    //     const jogoAgora = await evento(proximosJogos[0].id);
    //     setFuturosJogos(proximosJogos);
    //     setJogo(await evento(proximosJogos[0].id));
    //     setRefreshing(false);
    // };

    // const [teste, setTeste] = useState(0);
    // const executeAfterOneMinute = () => {
    //     console.log("Função executada após um minuto");
    // };
    // setTimeout(executeAfterOneMinute, 10000);

    const fetchData = async () => {
        const jogosFuturos = await jogosDepois();
        const jogoUltimoProx = await proximoJogo();
        const jogoAgora = await evento(jogoUltimoProx.previousEvent.id);
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
        }

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const tempoJogo = (jogo) => {
        const inicio = jogo.time.currentPeriodStartTimestamp;

        const now = moment();
        const currentPeriodStart = moment.unix(inicio); // Converte o timestamp para um objeto Moment

        const diff = now.diff(currentPeriodStart);
        const duration = moment.duration(diff); // Calcula a diferença em milissegundos

        const diffInMinutes = Math.floor(duration.asMinutes()); // Obtém a diferença em minutos
        const diffInSeconds = Math.floor(duration.asSeconds() % 60); // Obtém a diferença em segundos

        const timeDiff = `${diffInMinutes.toString().padStart(2, '0')}:${diffInSeconds.toString().padStart(2, '0')}`; // Formata a diferença no formato mm:ss

        let tempo;
        let acrescimos;

        switch (jogo.status.code) {
            // primeiro tempo
            case 6:
                acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime1) ?` +${jogo.time.injuryTime1}`:'';
                tempo = `1º ${timeDiff}${acrescimos}`;
                break;
            
            // segundo tempo
            case 7:
                acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime2) ?` +${jogo.time.injuryTime2}`:'';
                tempo = `2º ${timeDiff}${acrescimos}`;
                break;

            // case 100:
            //     acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime3) ?` +${jogo.time.injuryTime3}`:'';
            //     tempo = `P1º ${timeDiff}${acrescimos}`;
            //     break;

            // case 100:
            //     acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime4) ?` +${jogo.time.injuryTime4}`:'';
            //     tempo = `P2º ${timeDiff}${acrescimos}`;
            //     break;

            case 31: tempo = 'Intervalo'; break;
            case 100: tempo = 'Encerrado'; break;
        
            default: tempo = '00:00'; break;
        }

        // console.log(timeDiff);
        // console.log(tempo);
        return tempo;
    };

    const jogoAtivo = () => (
        <View style={styles.jogoRolando}>
            <View style={styles.topo}>
                <Text style={{ color: jogo.tournament.uniqueTournament.secondaryColorHex, ...styles.txtcampeonato }}>
                    {`${jogo.tournament.uniqueTournament.name} - ${jogo.roundInfo.round}ª Rodada`}
                </Text>
            </View>
            <View style={styles.timesUltimoJogo}>

                <View style={styles.timeCasa}>
                    <Text style={styles.txtTime}>{jogo.homeTeam.nameCode}</Text>
                    <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                    <Text style={styles.txtTime}>{jogo.homeScore.display}</Text>
                </View>

                <Text style={styles.txtX}>x</Text>

                <View style={styles.timeVisitante}>
                    <Text style={styles.txtTime}>{jogo.awayScore.display}</Text>
                    <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                    <Text style={styles.txtTime}>{jogo.awayTeam.nameCode}</Text>
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
