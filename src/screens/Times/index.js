import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import * as NavigationBar from 'expo-navigation-bar';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { urlTime } from '@/src/store/api';
import { getTimes, getSeasons, brasileiraoArtilheiros } from '@/src/store/store';
import {
    listaInternacionais,
    listaSelecoesEuropa,
    listaSelecoesAmerica,
    listaSelecoesAfrica
} from "@/src/store/listaTimes";

import { setMeuTime, setCarregarJogos } from '@/src/store/action';

import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import { Spinner } from "@/src/components/Spinner";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Times({ route }) {
    const params = route.params;
	const navigation = useNavigation();

    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const [load, setLoad] = useState(false);
    const [listaTimes, setListaTimes] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    const buscarTimes = async () => {
        const seasonsA = await getSeasons(325);
        const timesA = await getTimes(325, seasonsA.id);

        const seasonsB = await getSeasons(390);
        const timesB = await getTimes(390, seasonsB.id);

        setListaTimes([
            {
                name: "Brasileirão Série A",
                slug: "categoria",
                categoria: true,
                id: 't0',
            },
            ...timesA,
            {
                name: "Brasileirão Série B",
                slug: "categoria",
                categoria: true,
                id: 't1',
            },
            ...timesB,
            {
                name: "Times Internacionais",
                slug: "categoria",
                categoria: true,
                id: 't2',
            },
            ...listaInternacionais,
            {
                name: "Seleções da Europa",
                slug: "categoria",
                categoria: true,
                id: 't3',
            },
            ...listaSelecoesEuropa,
            {
                name: "Seleções da América",
                slug: "categoria",
                categoria: true,
                id: 't4',
            },
            ...listaSelecoesAmerica,
            {
                name: "Seleções da Africa",
                slug: "categoria",
                categoria: true,
                id: 't5',
            },
            ...listaSelecoesAfrica,
        ]);
        setRefreshing(false);
        setLoad(false);
    };

    const trocarTime = async (item) => {
        setRefreshing(true);
        dispatch(setMeuTime(item));
        dispatch(setCarregarJogos(true));
        setLoad(false);
        navigation.navigate('inicial');
    };

    const onRefresh = () => {
        setRefreshing(true);
        buscarTimes();
    };

    useEffect(() => {
        setRefreshing(true);
        buscarTimes();
    }, []);

    const renderOpcoes = ({ item, index }) => {
        if (item.categoria) return (<View style={{
            ...styles.infoSelect,
            justifyContent: 'center',
            paddingVertical: 10,
            paddingTop: (index == 0) ? 10 : 30
        }}>
            <Icon name="format-list-text" size={25} color="#434343" style={styles.chevronDown} />
            <Text style={styles.txtInfoTodos}>{item && item.name}</Text>
        </View>)

        else return (<BaseButton onPress={async () => {
            setLoad(true);
            setTimeout(() => trocarTime(item), 0);
        }}>
            <View style={styles.lista}>
                <Image
                    style={styles.img}
                    resizeMode="center"
                    source={{ uri: `${urlTime}${item.id}/image` }}
                />
                <Text style={styles.txt}>{item.shortName}</Text>
            </View>
        </BaseButton>)
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {meuTime && <BaseButton onPress={() => {
                    if (navigation.canGoBack()) navigation.goBack()
                    else trocarTime(meuTime)
                }}>
                    <Icon name="arrow-u-left-top" size={30} color="#434343" style={styles.voltar} />
                </BaseButton>}
                <View style={styles.info}>
                    <Text style={styles.txtInfo}>Selecione seu Time</Text>
                </View>
            </View>

            {load && <View style={styles.containerSpinner}>
                <Spinner />
            </View>}
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={listaTimes}
                renderItem={renderOpcoes}
                keyExtractor={(item) => item.id.toString()}
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
