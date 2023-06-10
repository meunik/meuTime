import React from 'react';
import { View, Text, Image } from 'react-native';
import { cariocao, cariocaoMataMata } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { ComFaseDeGrupos } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";

export function Carioca() {

    function renderTabela(item, key) {
        return (
            <View key={key} style={styles.lista}>
                <View style={styles.time}>
                    <View style={styles.posicao(item)}>
                        <Text style={styles.txtPosicao(item)}>{item.position}</Text>
                    </View>
                    <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                    <Text style={styles.txt}>{item.team.shortName}</Text>
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

    return (
        <ComFaseDeGrupos
            copa={cariocao}
            copaMataMata={cariocaoMataMata}
            renderTabela={renderTabela}
            legenda={legenda}
        />
    );
}
