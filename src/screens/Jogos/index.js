import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { jogosDepois, jogosAntes, proximoJogo, evento } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";

import { setCarregarJogos, setIntervalo } from '@/src/store/action';

import { JogoAtivo } from "@/src/components/Jogo";

export function Jogos() {
	const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const intervalo = useSelector(state => state.intervalo);

    const [jogo, setJogo] = useState(null);
    const [todosJogos, setTodosJogos] = useState(null);
    const [futurosJogos, setFuturosJogos] = useState(null);
    const [futurosNum, setFuturosNum] = useState(0);

    const [passadoJogos, setPassadoJogos] = useState(false);
    const [passadoNum, setPassadoNum] = useState(0);

    const [jogoAnteriorSeguinte, setJogoAnteriorSeguinte] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [loadingMore, setLoadingMore] = useState(false);
    const [showVerMais, setShowVerMais] = useState(false);
    const [btn, setBtn] = useState(false);
    const flatListRef = useRef(null);

    async function fetchData(passado = false) {
        setRefreshing(true);
        const jogoUltimoProx = await proximoJogo(meuTime?.id);
        const jogoAgora = await evento(jogoUltimoProx?.previousEvent?.id);

        if (passado && todosJogos && (passadoNum || passadoNum === 0)) {
            const jogosPassado = await jogosAntes(meuTime?.id, passadoNum);
            const events = jogosPassado?.events;
            if (events) {
                const itensFiltrados = events.filter(novoItem => !todosJogos.some(itemExistente => itemExistente.id === novoItem.id));
                setPassadoJogos(events);
                setTodosJogos([
                    ...itensFiltrados,
                    ...todosJogos
                ]);
                setTimeout(() => {
                    if (flatListRef.current) {
                        const altura = ((events.length - 2) * 117) + 45;
                        flatListRef.current.scrollToOffset({ offset: altura, animated: true });
                    }
                }, 0);
            }
            setPassadoNum((jogosPassado?.hasNextPage) ? passadoNum+1 : false);
        } else {
            const jogosFuturos = await jogosDepois(meuTime?.id, 0);
            const eventsFuturos = jogosFuturos?.events;
            setFuturosNum((jogosFuturos?.hasNextPage) ? 1 : false);
            setFuturosJogos(eventsFuturos);
            setTodosJogos(eventsFuturos);

            setPassadoJogos(false);
            setPassadoNum(0);
        }

        setJogo(jogoAgora);
        setJogoAnteriorSeguinte(jogoUltimoProx);

        if (jogoUltimoProx.previousEvent.status.type == 'inprogress') {
            const interval = setInterval(async () => {
                const jogoAtualizado = await evento(jogoAgora.id);
                setJogo(jogoAtualizado);
                if (jogoAtualizado.status.type != 'inprogress') {
                    clearInterval(interval);
                }
            }, 1000);
            dispatch(setIntervalo(interval))
        }
        clearInterval(intervalo);

        setRefreshing(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData(true);
    };
  
    const renderHeader = () => (
        passadoJogos && todosJogos && (
        <BaseButton onPress={() => {
            const total = todosJogos
            if (passadoJogos && flatListRef.current) {
                const altura = ((total.length - futurosJogos.length - 2) * 117) + 45;
                flatListRef.current.scrollToOffset({ offset: altura, animated: true });
            }
        }}>
            <View style={styles.btn}>
                <Text style={styles.txtLink}>Voltar aos jogos Atuais</Text>
            </View>
        </BaseButton>
      )
    );

    const loadMoreData = async () => {
        if (futurosNum == false) return;
        setRefreshing(true);
        setLoadingMore(true);

        const jogosFuturos = await jogosDepois(meuTime?.id, futurosNum);
        const eventsFuturos = jogosFuturos?.events;
        setFuturosNum((jogosFuturos?.hasNextPage) ? futurosNum+1 : false);
        setFuturosJogos([
            ...futurosJogos,
            ...eventsFuturos
        ]);
        setTodosJogos([
            ...todosJogos,
            ...eventsFuturos
        ]);

        setLoadingMore(false);
        setRefreshing(false);
    };
    
    useEffect(() => {
        if (carregarJogos) {
            setRefreshing(true);
            fetchData();
            dispatch(setCarregarJogos(false))
        }
    }, [carregarJogos]);

    const renderItem = ({ item, index }) => !item.status.code ? (
        <JogoAtivo jogo={item} campeonato={true} altura={117} />
    ) : (
        <BaseButton onPress={() => navigation.navigate('Partida', { idPartida: item.id })}>
            <JogoAtivo jogo={item} campeonato={true} tamanhoImg={30} altura={117} />
        </BaseButton>
    );

    return (
        <View style={styles.container}>
            {jogo ? <BaseButton onPress={() => navigation.navigate('Partida', { idPartida: jogo.id })}>
                <JogoAtivo jogo={jogo} bordas={false} altura={117} />
            </BaseButton>:null}

            <FlatList
                ref={flatListRef}
                contentContainerStyle={styles.contentContainerStyle}
                data={todosJogos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.9} // 0.5 = 50%
                ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}
