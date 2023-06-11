import React from 'react';
import { View, Text, Image } from 'react-native';
import {
    cariocaoInfo,
    cariocao,
    cariocaoMataMata,
    cariocaoJogosAntes,
    cariocaoJogosDepois,
    cariocaoRodada,
} from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Copa } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";

import { limitarString } from "@/src/Utils/LimitarString";

export function Carioca() {

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
                <View style={styles.linksContainer}>
                </View>
                <View>
                    <Text style={styles.txtLegenda}>Campeão da Taça Guanabara e Semifinalistas <View style={styles.bolinhaCampeao}></View></Text>
                    <Text style={styles.txtLegenda}>Semifinalistas <View style={styles.bolinhaSemifinalista}></View></Text>
                    <Text style={styles.txtLegenda}>Taça Rio <View style={styles.bolinhaTacaRio}></View></Text>
                    <Text style={styles.txtLegenda}>Rebaixamento <View style={styles.bolinhaRebaixados}></View></Text>
                </View>
            </View>
        );
    }

    function stringRodada(valor) {
        switch (valor) {
            case '27': return 'Quartas de Final';
            case '28': return 'SemiFinal';
            case '29': return 'Final';
        
            default: return `Rodada ${valor}`;
        }
    }

    return (
        <Copa
            copa={cariocao}
            copaMataMata={cariocaoMataMata}
            renderTabela={renderTabela}
            legenda={legenda}
            buscaJogosAntes={cariocaoJogosAntes}
            buscaJogosDepois={cariocaoJogosDepois}
            buscaRodada={cariocaoRodada}
            buscaTorneio={cariocaoInfo}
            stringRodada={stringRodada}
            eliminatoriaVertical='vertical'
        />
    );
}
