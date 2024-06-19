import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { urlBase } from '@/src/store/api';
import { tempoJogo } from "@/src/Utils/TempoJogo";
import { styles } from "./styles";
import { evento } from '@/src/store/store';
import { limitarString } from "@/src/Utils/LimitarString";

const tituloJogo = (jogo) => {
    const campeonato = jogo.tournament.uniqueTournament.name;
    switch (jogo.roundInfo?.cupRoundType) {
        case 1: return `${campeonato} - ${jogo.roundInfo.name}`;
        case 2: return `${campeonato} - Semifinal`;
        case 4: return `${campeonato} - Quartas de final`;
        case 8: return `${campeonato} - Oitavas de final`;
    
        default: return `${campeonato} - ${jogo.roundInfo?.round}ª Rodada`;
    }
};

export function JogoAtivo ({
    jogo,
    nomes = true,
    titulo = true,
    tempo = true,
    tamanhoImg = 0,
    altura = 0,
    campeonato = false,
    bordas = true,
    estadio = true,
}) {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const buscarEvento = async () => {
            if (estadio) {
                const eventoData = await evento(jogo.id);
                setEvent(eventoData);
            }
        };

        buscarEvento();
    }, [jogo.id]);

    const estadioFormat = (nome) => {
        let retorno = nome;
        if (nome.includes("Estádio do")) retorno = nome.replace("Estádio do", "");
        else if (nome.includes("Estádio ")) retorno = nome.replace("Estádio ", "");
        else retorno = nome;
        return limitarString(retorno, 25)
    }

    return jogo ? (
        <View style={styles.jogoRolando(altura, bordas)}>
            {titulo && <View style={styles.topo}>
                <Text style={{ ...styles.txtcampeonato, color: jogo.tournament.uniqueTournament.secondaryColorHex }}>
                    {tituloJogo(jogo)}
                </Text>
            </View>}
            <View style={styles.timesUltimoJogo}>

                {campeonato && <View style={styles.campeonato}>
                    <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${jogo.tournament.uniqueTournament.id}/image/dark` }} />
                </View>}

                <View style={styles.times}>
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
                        {nomes && <Text style={styles.txtTime}>{jogo.homeTeam.nameCode}</Text>}
                        <Image style={styles.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                        <Text style={styles.txtTime}>{jogo.homeScore.display}</Text>
                    </View>

                    <Text style={styles.txtX}>x</Text>

                    <View style={styles.timeVisitante}>
                        <Text style={styles.txtTime}>{jogo.awayScore.display}</Text>
                        <Image style={styles.imgLista(tamanhoImg)} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                        {nomes && <Text style={styles.txtTime}>{jogo.awayTeam.nameCode}</Text>}
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

            </View>
            {((jogo.status.code == 500)||(jogo.status.code == 120))&&
            <View style={styles.placarPenaltis(altura)}>
                <Text style={styles.txtPenaltis}>({jogo.homeScore.current-jogo.homeScore.display} x {jogo.awayScore.current-jogo.awayScore.display})</Text>
            </View>}
            {tempo && <View style={styles.rodape}>
                {estadio && event && event.venue && event.venue.stadium.name && <Text style={styles.txtEstadio}>{estadioFormat(event.venue.stadium.name)} -</Text>}
                <Text style={styles.txtTempo}>{tempoJogo(jogo)}</Text>
            </View>}
        </View>
    ) : null;
};