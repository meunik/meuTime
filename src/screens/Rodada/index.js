import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import { View, Text, Image, useWindowDimensions, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import {
    torneio,
    torneioArtilheiros,
    torneioUltimosEventos,
    getSeasons,
    torneioJogosDepois,
    torneioJogosAntes,
    torneioRodada
} from '@/src/store/store';
import { SelectTorneios } from "./SelectTorneios";
import { Lista } from "@/src/components/Lista";
import { urlBase } from '@/src/store/api';

import { styles } from "./styles";
import ptBr from "@/src/Utils/ptBr";
import { JogoAtivo } from "@/src/components/Jogo";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Rodada() {
    const meuTime = useSelector(state => state.meuTime);
    
    const [refreshing, setRefreshing] = useState(false);
    const [estatistica, setEstatistica] = useState(null);

    const [passesHome, setPassesHome] = useState(null);
    const [passesAway, setPassesAway] = useState(null);

    const [passesHomePorcent, setPassesHomePorcent] = useState(null);
    const [passesAwayPorcent, setPassesAwayPorcent] = useState(null);

    const [selectedTorneio, setSelectedTorneio] = useState([]);
    const handleTorneioChange = (torneio) => setSelectedTorneio(torneio);

    const layout = useWindowDimensions();

    const buscarTimes = async () => {
        setRefreshing(true);
        setJogosRodada([]);
        let att = [];
        for (let torneio of selectedTorneio) {
            attRodando.current = false;
            att[torneio.id] = await jogosRodadaTorneio(torneio);
        }
        setJogosRodada(att);
        if (selectedTorneio.length == 0) setJogosRodada([]);
        setRefreshing(false);
    };


	const navigation = useNavigation();
    const isFocusedRef = useRef(false);
    const attRodando = useRef(false);
    const [jogosRodada, setJogosRodada] = useState({});
    const [carregando, setCarregando] = useState(true);

    const jogosRodadaTorneio = async (torneio) => {
        if (attRodando.current) return;
        attRodando.current = true;

        let season = await getSeasons(torneio.id);
        
        const jogosDepois = await torneioJogosDepois(torneio.id, season.id);
        const jogosAntes = await torneioJogosAntes(torneio.id, season.id);
        const rodada = await torneioRodada(torneio.id, season.id);
        let depois = jogosDepois ? jogosDepois?.events : [];
        let antes = jogosAntes ? jogosAntes?.events : [];
        round = rodada?.round;
        depois = depois.filter(item => item.roundInfo.round == round);
        antes = antes.filter(item => item.roundInfo.round == round);
        const rodadaJogos = [...antes, ...depois];
        const emAndamento = rodadaJogos.filter(item => item.status.type == "inprogress");

        setTimeout(async () => {
            attRodando.current = false;
            if ((emAndamento.length > 0) && isFocusedRef.current && !attRodando.current) fetchDataTabela(torneio);
        }, 15000);

        return {
            torneio: torneio,
            jogos: rodadaJogos
        };
    };

    const onRefresh = () => {
        setRefreshing(true);
        buscarTimes();
    };

    useFocusEffect(
        React.useCallback(() => {
            isFocusedRef.current = true;
            buscarTimes();
            return () => isFocusedRef.current = false;
        }, [selectedTorneio])
    );

    // useEffect(() => {
    //     buscarTimes();
    // }, [selectedTorneio]);

    const renderTorneios = (item, key) => {
        const [isVisible, setIsVisible] = useState(false);
        const animatedHeight = useRef(new Animated.Value(0)).current;
    
        const toggleList = () => {
            if (isVisible) {
                Animated.timing(animatedHeight, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }).start(() => setIsVisible(false));
            } else {
                setIsVisible(true);
                Animated.timing(animatedHeight, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false
                }).start();
            }
        };
    
        return (
            <View key={key}>
                <TouchableOpacity onPress={toggleList} style={styles.infoContainer}>
                    <View style={{...styles.info, justifyContent: 'center', minHeight: 50}}>
                        <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${item.torneio.id}/image/dark` }} />
                        <Text style={styles.txtInfo}>{item.torneio.name}</Text>
                    </View>
                    <Icon name="chevron-down" size={25} color="#434343" style={styles.chevronDown} />
                </TouchableOpacity>
                <Animated.View style={{ height: animatedHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, item.jogos.length*117] // Se mudar a altura do <JogoAtivo> mudar aqui também
                }), overflow: 'hidden' }}>
                    <Lista
                        contentContainerStyle={styles.contentContainerStyle}
                        data={item.jogos}
                        renderItem={renderJogos}
                    />
                </Animated.View>
            </View>
        );
    };

    const renderJogos = (item, key) => {
        return (<BaseButton key={key} onPress={() => navigation.navigate('Partida', { idPartida: item.id })}>
            <JogoAtivo jogo={item} campeonato={true} tamanhoImg={30} altura={117} />
        </BaseButton>)
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewSelectTorneio}>
                <SelectTorneios onTorneioChange={handleTorneioChange} />
            </View>

            <ScrollView
                contentContainerStyle={styles.tabsContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.txtInfo}>Rodada</Text>
                {jogosRodada && <Lista
                    contentContainerStyle={styles.contentContainerStyle}
                    data={jogosRodada}
                    renderItem={renderTorneios}
                />}
            </ScrollView>
        </View>
    );
}
