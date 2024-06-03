import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { brasileiraoArtilheiros } from '@/src/store/store';
import { limitarString } from "@/src/Utils/LimitarString";
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";

import { BaseButton } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Artilheiros({ route }) {
    const params = route.params;
	const limitaString = 13;

	const navigation = useNavigation();
    const [artilheiros, setArtilheiros] = useState(params.artilheiros);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDataArtilheiro = async () => {
        setArtilheiros(params.artilheiros);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataArtilheiro();
    };

    useEffect(() => {
        // fetchDataArtilheiro();
    }, []);

    const renderArtihleiro = ({ item, index }) => (
        <View style={styles.lista}>
            <View style={styles.time}>
                <View style={styles.posicao}>
                    <Text style={styles.txtPosicao}>{index + 1}</Text>
                </View>
                <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                <Text style={styles.txt}>{limitarString(item.player.name, limitaString)}</Text>
                {/* <Text style={styles.txt}>{item.player.name}</Text> */}
            </View>
            <View style={styles.pontos}>
                <Text style={styles.txtPontos}>{item.goals}</Text>
                <Text style={styles.txtPontos}>{item.totalShots}</Text>
                <Text style={styles.txtPontos}>{item.successfulDribbles}</Text>
                <Text style={{...styles.txtPontos, width: 17}}>{item.bigChancesMissed}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.info}>
                    <BaseButton onPress={() => navigation.goBack()}>
                        <Icon name="arrow-u-left-top" size={30} color="#434343" style={styles.voltar} />
                    </BaseButton>
                    {(params && params.campeonato.uniqueTournament) && 
                        <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${params.campeonato.uniqueTournament.id}/image/dark` }} />}
                    {(
                        params && 
                        (Array.isArray(params.campeonato) && 
                        params.campeonato[0].tournament.uniqueTournament)
                    ) && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${params.campeonato[0].tournament.uniqueTournament.id}/image/dark` }} />}
                    <View>
                        <Text style={styles.txtInfo}>Artilheiros</Text>
                        {/* <Text style={styles.txtInfo}>{params && params.campeonatoNome}</Text> */}
                    </View>
                </View>
                <View>
                    <Text style={styles.txtLegenda}>Gols :G</Text>
                    <Text style={styles.txtLegenda}>Finalizações :F</Text>
                    <Text style={styles.txtLegenda}>Dribles :D</Text>
                    <Text style={styles.txtLegenda}>Grandes Chances Pertidas :CP</Text>
                </View>
                <View style={styles.listaInfo}>
                    <View style={styles.time}>
                        <View>
                            <Text style={styles.txtInfo}>#</Text>
                        </View>
                        <Text style={styles.txtInfo}>Jogadores</Text>
                    </View>
                    <View style={styles.pontos}>
                        <Text style={styles.txtInfoPontos}>G</Text>
                        <Text style={styles.txtInfoPontos}>F</Text>
                        <Text style={styles.txtInfoPontos}>D</Text>
                        <Text style={{...styles.txtInfoPontos, width: 17}}>CP</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={artilheiros && artilheiros}
                renderItem={renderArtihleiro}
                keyExtractor={(item) => item.player.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}
