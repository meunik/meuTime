import React from 'react';
import { Text, View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { urlBase } from '@/src/store/api';
import { tempoJogo } from "@/src/Utils/TempoJogo";
import { styles } from "./styles";

export function JogoFuturo ({
    tamanhoImg = 0,
    altura = 0,
    final = false
}) {
    return (
        <View style={{...styles.jogoRolando, height: altura?altura:100,}}>
            <View style={(final)?styles.timesFinal:styles.timesUltimoJogo}>
                <View style={styles.timeCasa}>
                    <SvgUri
                        height={(tamanhoImg)?tamanhoImg:40}
                        width={(tamanhoImg)?tamanhoImg:40}
                        resizeMode="center" source={{ uri: `https://www.sofascore.com/static/images/placeholders/team.svg` }}
                    />
                </View>

                <View style={styles.centralizado}>
                    <Icon name="close" size={15} color="#969696"/>
                </View>

                <View style={styles.timeVisitante}>
                    <SvgUri
                        height={(tamanhoImg)?tamanhoImg:40}
                        width={(tamanhoImg)?tamanhoImg:40}
                        resizeMode="center" source={{ uri: `https://www.sofascore.com/static/images/placeholders/team.svg` }}
                    />
                </View>
            </View>
        </View>
    );
};

const tituloJogo = (jogo) => {
    const campeonato = jogo.tournament.uniqueTournament.name;
    // console.log(jogo);
    switch (jogo.roundInfo?.cupRoundType) {
        case 1: return `${campeonato} - ${jogo.roundInfo.name}`;
        case 8: return `${campeonato} - Oitavas de final`;
    
        default: return `${campeonato} - ${jogo.roundInfo.round}ª Rodada`;
    }
};

export function JogoAtivo ({
    jogo,
    nomes = true,
    titulo = true,
    tempo = false,
    tamanhoImg = 0,
    altura = 0,
    final = false
}) {
    console.log(jogo);
    return jogo ? (
        <View style={styles.jogoRolando(altura, final)}>
            <View style={(final)?styles.timesFinal:styles.timesUltimoJogo}>

                <View style={styles.timeCasa}>
                    {nomes && <Text style={styles.txtTime}>{jogo.homeTeam.nameCode}</Text>}
                    <Image style={styles.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                    <Text style={styles.txtPlacar(final)}>{jogo.homeScore.display}</Text>
                </View>

                <Icon name="close" size={15} color="#969696"/>

                <View style={styles.timeVisitante}>
                    <Text style={styles.txtPlacar(final)}>{jogo.awayScore.display}</Text>
                    <Image style={styles.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                    {nomes && <Text style={styles.txtTime}>{jogo.awayTeam.nameCode}</Text>}
                </View>

            </View>
            {((jogo.status.code == 500)||(jogo.status.code == 120))&&
            <View style={styles.placarPenaltis(altura)}>
                <Text style={styles.txtPenaltis}>({jogo.homeScore.current-jogo.homeScore.display} x {jogo.awayScore.current-jogo.awayScore.display})</Text>
            </View>}
            {tempo && <View style={styles.rodape}>
                <Text style={styles.txtTempo}>{tempoJogo(jogo)}</Text>
            </View>}
        </View>
    ) : null;
};