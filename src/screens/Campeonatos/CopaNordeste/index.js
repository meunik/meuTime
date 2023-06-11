import React from 'react';
import { View, Text, Image } from 'react-native';
import { copaNordeste, copaNordesteMataMata } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";

import { limitarString } from "@/src/Utils/LimitarString";
import { Copa } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";

export function CopaNordeste() {
    function renderTabela(item, key) {
        return (
            <View key={key} style={styles.lista}>
                <View style={styles.time}>
                    <View style={styles.posicao(item)}>
                        <Text style={styles.txtPosicao(item)}>{item.position}</Text>
                    </View>
                    <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                    <Text style={styles.txt}>{limitarString(item.team.shortName, 13)}</Text>
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
                    <Text style={styles.txtLegenda}>Quartas de Final <View style={styles.bolinhaSemifinalista}></View></Text>
                </View>
            </View>
        );
    }

    return (
        <Copa
            copa={copaNordeste}
            copaMataMata={copaNordesteMataMata}
            renderTabela={renderTabela}
            legenda={legenda}
        />
    );
}
