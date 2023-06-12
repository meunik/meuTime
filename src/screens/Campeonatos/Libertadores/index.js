import React from 'react';
import { View, Text, Image } from 'react-native';
import {
    copaLibertadoresInfo,
    copaLibertadores,
    libertadoresMataMata,
    libertadoresJogosAntes,
    libertadoresJogosDepois,
    libertadoresRodada,
} from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Copa } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";

import { limitarString } from "@/src/Utils/LimitarString";

export function Libertadores() {

    function renderTabela(item, key) {
        return (
            <View key={key} style={styles.lista}>
                <View style={styles.time}>
                    <View style={styles.posicao(item)}>
                        <Text style={styles.txtPosicao(item)}>{item.position}</Text>
                    </View>
                    <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                    <Text style={styles.txt}>{limitarString(item.team.shortName, 14)}</Text>
                </View>
                <View style={styles.pontos}>
                    <Text style={styles.txtPontos}>{item.points}</Text>
                    <Text style={styles.txtPontos}>{item.matches}</Text>
                    <Text style={styles.txtPontos}>{item.wins}</Text>
                    <Text style={styles.txtPontos}>{item.draws}</Text>
                    <Text style={styles.txtPontos}>{item.losses}</Text>
                    <Text style={{...styles.txtPontos, width: 20}}>{item.scoresFor - item.scoresAgainst}</Text>
                </View>
            </View>
        );
    }

    function legenda(item) {
        return (
            <View style={styles.listaInfo}>
                <View style={styles.linksContainer}></View>
                <View>
                    <Text style={styles.txtLegenda}>Oitavas de Final <View style={styles.bolinhaOitavas}></View></Text>
                    <Text style={styles.txtLegenda}>Sulamericana <View style={styles.bolinhaPlayoffsOitavas}></View></Text>
                </View>
            </View>
        );
    }

    function stringRodada(valor) {
        switch (valor) {
            // case '5': return 'Oitavas de Final';
            // case '27': return 'Quartas de Final';
        
            default: return `Rodada ${valor}`;
        }
    }

    return (
        <Copa
            copa={copaLibertadores}
            copaMataMata={libertadoresMataMata}
            renderTabela={renderTabela}
            legenda={legenda}
            desabilitarMataMata={true}
            buscaJogosAntes={libertadoresJogosAntes}
            buscaJogosDepois={libertadoresJogosDepois}
            buscaRodada={libertadoresRodada}
            buscaTorneio={copaLibertadoresInfo}
            stringRodada={stringRodada}
        />
    );
}