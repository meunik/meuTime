import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { brasileirao } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";

export function BrasileiraoTabela() {
    const [tabela, setTabela] = useState(null);

    useEffect(() => {
        const fetchDataTabela = async () => {
            setTabela(await brasileirao());
        };

        fetchDataTabela();
    }, []);

    const renderTabela = ({ item }) => (
        <View style={styles.lista}>
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
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.listaInfo}>
                <View style={styles.time}>
                    <View>
                        <Text style={styles.txtInfo}>#</Text>
                    </View>
                    <Text style={styles.txtInfo}>Times</Text>
                </View>
                <View style={styles.pontos}>
                    <Text style={styles.txtInfoPontos}>P</Text>
                    <Text style={styles.txtInfoPontos}>J</Text>
                    <Text style={styles.txtInfoPontos}>V</Text>
                    <Text style={styles.txtInfoPontos}>E</Text>
                    <Text style={styles.txtInfoPontos}>D</Text>
                </View>
            </View>
            <FlatList
                data={tabela && tabela.rows}
                renderItem={renderTabela}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
