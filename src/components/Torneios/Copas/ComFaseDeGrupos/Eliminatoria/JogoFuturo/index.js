import React from 'react';
import { Text, View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { urlBase } from '@/src/store/api';
import { tempoJogo } from "@/src/Utils/TempoJogo";
import { stylesFuturo, stylesAtivo } from "./styles";

export function JogoFuturo ({
    tamanhoImg = 0,
    altura = 0,
    vertical = false,
}) {
    return (
        <View style={{...stylesFuturo.jogoRolando, height: altura?altura:100,}}>
            <View style={stylesFuturo.timesUltimoJogo(vertical)}>
                <View style={stylesFuturo.timeCasa}>
                    <SvgUri
                        height={(tamanhoImg)?tamanhoImg:40}
                        width={(tamanhoImg)?tamanhoImg:40}
                        resizeMode="center" source={{ uri: `https://www.sofascore.com/static/images/placeholders/team.svg` }}
                    />
                </View>

                <View style={stylesFuturo.centralizado}>
                    <Icon name="close" size={15} color="#969696"/>
                </View>

                <View style={stylesFuturo.timeVisitante}>
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
    tempo = true,
    tamanhoImg = 0,
    altura = 0,
}) {
    return jogo ? (
        <View style={stylesAtivo.jogoRolando(altura)}>
            {titulo && <View style={stylesAtivo.topo}>
                <Text style={{ color: jogo.tournament.uniqueTournament.secondaryColorHex, ...stylesAtivo.txtcampeonato }}>
                    {tituloJogo(jogo)}
                </Text>
            </View>}
            <View style={stylesAtivo.timesUltimoJogo}>

                <View style={stylesAtivo.timeCasa}>
                    <View style={stylesAtivo.cartaoVermelhoContainer}>
                        {jogo.homeRedCards && (() => {
                            const items = [];
                            for (let i = 0; i < jogo.homeRedCards; i++) {
                                items.push(
                                    <Icon key={'homeRedCards'+i} name="card" size={10} color="#e35c47" style={stylesAtivo.cartaoVermelho} />
                                );
                            }
                            return items;
                        })()}
                    </View>
                    {nomes && <Text style={stylesAtivo.txtTime}>{jogo.homeTeam.nameCode}</Text>}
                    <Image style={stylesAtivo.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                    <Text style={stylesAtivo.txtTime}>{jogo.homeScore.display}</Text>
                </View>

                <Text style={stylesAtivo.txtX}>x</Text>

                <View style={stylesAtivo.timeVisitante}>
                    <Text style={stylesAtivo.txtTime}>{jogo.awayScore.display}</Text>
                    <Image style={stylesAtivo.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                    {nomes && <Text style={stylesAtivo.txtTime}>{jogo.awayTeam.nameCode}</Text>}
                    <View style={stylesAtivo.cartaoVermelhoContainer}>
                        {jogo.awayRedCards && (() => {
                        const items = [];
                        for (let i = 0; i < jogo.awayRedCards; i++) {
                            items.push(
                                <Icon key={'awayRedCards'+i} name="card" size={10} color="#e35c47" style={stylesAtivo.cartaoVermelho} />
                            );
                        }
                        return items;
                        })()}
                    </View>
                </View>

            </View>
            {((jogo.status.code == 500)||(jogo.status.code == 120))&&
            <View style={stylesAtivo.placarPenaltis(altura)}>
                <Text style={stylesAtivo.txtPenaltis}>({jogo.homeScore.current-jogo.homeScore.display} x {jogo.awayScore.current-jogo.awayScore.display})</Text>
            </View>}
            {tempo && <View style={stylesAtivo.rodape}>
                <Text style={stylesAtivo.txtTempo}>{tempoJogo(jogo)}</Text>
            </View>}
        </View>
    ) : null;
};