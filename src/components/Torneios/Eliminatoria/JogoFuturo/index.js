import React from 'react';
import { Text, View, Image } from 'react-native';
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
        <View style={{height: altura?altura:100}}>
            <View style={stylesFuturo.timesUltimoJogo(vertical)}>
                <View style={stylesFuturo.timeCasa}>
                    <Image style={stylesAtivo.imgLista(tamanhoImg)} resizeMode="center" source={require('@/assets/team.png')} />
                </View>

                <View style={stylesFuturo.centralizado}>
                    <Icon name="close" size={15} color="#969696"/>
                </View>

                <View style={stylesFuturo.timeVisitante}>
                    <Image style={stylesAtivo.imgLista(tamanhoImg)} resizeMode="center" source={require('@/assets/team.png')} />
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
    vertical = false,
    direita = false,
}) {
    return jogo ? (
        <View style={stylesAtivo.jogoRolando(altura)}>
            <View style={stylesAtivo.timesUltimoJogo(vertical)}>

                <View style={stylesAtivo.timeCasa(vertical)}>
                    <View style={stylesAtivo.cartaoVermelhoContainerEsquerda(vertical)}>
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

                <View style={stylesFuturo.centralizado}>
                    <Icon name="close" size={15} color="#969696"/>
                </View>

                <View style={stylesAtivo.timeVisitante(vertical)}>
                    <View style={stylesAtivo.cartaoVermelhoContainerDireita(vertical)}>
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
                    <Text style={stylesAtivo.txtTime}>{jogo.awayScore.display}</Text>
                    <Image style={stylesAtivo.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                    {nomes && <Text style={stylesAtivo.txtTime}>{jogo.awayTeam.nameCode}</Text>}
                </View>

            </View>
            {((jogo.status.code == 500)||(jogo.status.code == 120))&&
            <View style={stylesAtivo.placarPenaltis(altura, vertical, direita)}>
                <Text style={stylesAtivo.txtPenaltis}>{jogo.homeScore.current-jogo.homeScore.display}</Text>
                <View style={stylesFuturo.centralizado}>
                    <Icon name="close" size={7} color="#969696"/>
                </View>
                <Text style={stylesAtivo.txtPenaltis}>{jogo.awayScore.current-jogo.awayScore.display}</Text>
            </View>}
            {tempo && <View style={stylesAtivo.rodape}>
                <Text style={stylesAtivo.txtTempo}>{tempoJogo(jogo)}</Text>
            </View>}
        </View>
    ) : null;
};