import React from 'react';
import { Text, View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { styles } from "./styles";

export function JogoFuturo ({
    tamanhoImg = 0,
    altura = 0,
}) {
    return (
        <View style={{...styles.jogoRolando, height: altura?altura:100,}}>
            <View style={styles.timesUltimoJogo}>
                <View style={styles.timeCasa}>
                    <SvgUri
                        height={(tamanhoImg)?tamanhoImg:40}
                        width={(tamanhoImg)?tamanhoImg:40}
                        resizeMode="center" source={{ uri: `https://www.sofascore.com/static/images/placeholders/team.svg` }}
                    />
                </View>

                <View>
                    <Text style={styles.txtX}>x</Text>
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