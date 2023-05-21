import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { brasileiraoArtilheiros } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";

export function Artilheiros() {
    const [artilheiros, setArtilheiros] = useState(null);

    useEffect(() => {
        const fetchDataTabela = async () => {
            setArtilheiros(await brasileiraoArtilheiros());
        };

        fetchDataTabela();
    }, []);

    const renderArtihleiro = ({ item, index }) => (
        <View style={styles.lista}>
            <View style={styles.time}>
                <View style={styles.posicao(item)}>
                    <Text style={styles.txtPosicao(item)}>{index + 1}</Text>
                </View>
                <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                <Text style={styles.txt}>{item.player.name}</Text>
            </View>
            <View style={styles.pontos}>
                <Text style={styles.txtPontos}>{item.goals}</Text>
                <Text style={styles.txtPontos}>{item.totalShots}</Text>
                <Text style={styles.txtPontos}>{item.successfulDribbles}</Text>
                <Text style={styles.txtPontos}>{item.bigChancesMissed}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={artilheiros && artilheiros}
                renderItem={renderArtihleiro}
                keyExtractor={(item) => item.player.id.toString()}
            />
        </View>
    );
}
