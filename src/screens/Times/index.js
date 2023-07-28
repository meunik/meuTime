import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import * as NavigationBar from 'expo-navigation-bar';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { urlTime } from '@/src/store/api';
import { brasileiraoArtilheiros } from '@/src/store/store';

import { setMeuTime, setCarregarJogos } from '@/src/store/action';

import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import { Spinner } from "@/src/components/Spinner";

export function Times({ route }) {
    const params = route.params;
	const navigation = useNavigation();

    const listaTimes = useSelector(state => state.listaTimes);
    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();

    const trocarTime = async (item) => {
        dispatch(setMeuTime(item));
        dispatch(setCarregarJogos(true));
        navigation.navigate('inicial');
    };

    const renderOpcoes = ({ item, index }) => (
        <BaseButton onPress={async () => {
                setLoad(true);
                trocarTime(item)
            }}>
            <View style={styles.lista}>
                <Image
                    style={styles.img}
                    resizeMode="center"
                    source={{ uri: `${urlTime}${item.id}/image` }}
                />
                <Text style={styles.txt}>{item.name}</Text>
            </View>
        </BaseButton>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.txtInfo}>Selecione seu Time</Text>

            {load && <View style={styles.containerSpinner}>
                <Spinner />
            </View>}
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={listaTimes}
                renderItem={renderOpcoes}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
