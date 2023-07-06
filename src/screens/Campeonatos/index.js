import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setTorneioId, setSeason, setTorneio as setTorneioStorage } from '@/src/store/action';
import { View, Text, Image, TouchableOpacity, Animated, ScrollView, useWindowDimensions } from 'react-native';
import { ScrollViewIndicator } from '@fanchenbao/react-native-scroll-indicator';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { listaTorneios } from "@/src/store/listaTorneios";
import { brasileirao, torneios as getTorneios, getSeasons } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Copa as CopaGrupos } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";
import { Copa as CopaMataMata } from "@/src/components/Torneios/Copas/MataMata";
import { Tabela } from "@/src/screens/Campeonatos/Tabela/index";

export function Campeonatos() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

    const layout = useWindowDimensions();
	const navigation = useNavigation();
    const meuTime = useSelector(state => state.meuTime);
    const torneioStorage = useSelector(state => state.torneio);
    // const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const [torneio, setTorneio] = useState(torneioStorage);
    const [torneios, setTorneios] = useState(null);
    const [torneioId, setTorneioIdLocal] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [listaStatic, setTistaStatic] = useState(false);

    const fetchDataTabela = async () => {
        const torneiosFetch = await getTorneios(meuTime?.id);
        torneiosFetch.forEach((e, i) => {
            filtrado = listaTorneios.filter(item => item.id == e.id);
            if (filtrado[0]) torneiosFetch[i] = filtrado[0];
            else torneiosFetch.splice(i);
        });
        setTorneios(torneiosFetch);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        setRefreshing(true);
        fetchDataTabela();
    }, [meuTime, torneioId]);

    const [isViewVisible, setIsViewVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handleButtonPress = () => {
        setIsViewVisible(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleOutsidePress = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsViewVisible(false));
        setTistaStatic(false);
    };

    const interpolatedY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-2, 0],
    });

    const viewStyle = {
        opacity: animation,
        transform: [{ translateY: interpolatedY }],
    };

    function torneioSeuTime(objeto) {
        let objetoExiste = false;
        for (let i = 0; i < torneios.length; i++) {
            if (torneios[i].id === objeto.id) {
                objetoExiste = true;
                break;
            }
        }
        return objetoExiste;
    }

    const selecionaTorneio = async (torneioObjeto) => {
        if (torneioSeuTime(torneioObjeto)) {
            dispatch(setTorneioStorage(torneioObjeto));
            setTorneio(torneioObjeto);
        } else {
            setTorneio(torneioObjeto);
        }
        handleOutsidePress();
    };

    const exibeTorneio = () => {
        dispatch(setTorneioId(torneio?.id));

        const padrao = (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.txtInfo}>Indisponível no momento</Text>
            </View>
        );

        if (torneio) {
            filtrado = listaTorneios.filter(item => item.id == torneio.id);
            return (filtrado[0]) ? filtrado[0].container : padrao;
        }

        return padrao;
    };

    const Lista = () => {
        const items = [];
        for (let i = 0; i < torneios.length; i++) {
            items.push(
                <TouchableOpacity key={'torneios'+i} onPress={() => selecionaTorneio(torneios[i])}>
                    <View style={styles.infoSelect}>
                        {torneios[i] && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneios[i].id}/image/dark` }} />}
                        <Text style={styles.txtInfo}>{torneios[i] && torneios[i].name}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        items.push(
            <TouchableOpacity key={`torneios${torneios.length}`} onPress={() => setTistaStatic(true)}>
                <View style={{...styles.infoSelect, justifyContent: 'center', paddingVertical: 10,}}>
                    <Icon name="format-list-text" size={25} color="#434343" style={styles.chevronDown} />
                    <Text style={styles.txtInfoTodos}>Exibir todos disponíveis</Text>
                </View>
            </TouchableOpacity>
        );

        return items;
    }

    const ListarTodos = () => {
        const items = [];
        for (let i = 0; i < listaTorneios.length; i++) {
            items.push(
                <TouchableOpacity key={'listaTorneios'+i} onPress={() => selecionaTorneio(listaTorneios[i])}>
                    <View style={styles.infoSelect}>
                        {listaTorneios[i] && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${listaTorneios[i].id}/image/dark` }} />}
                        <Text style={styles.txtInfo}>{listaTorneios[i] && listaTorneios[i].name}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        items.push(
            <TouchableOpacity key={`listaTorneios${listaTorneios.length}`} onPress={() => setTistaStatic(false)}>
                <View style={{...styles.infoSelect, justifyContent: 'center', paddingVertical: 10,}}>
                    <Icon name="arrow-left-bold" size={25} color="#434343" style={styles.chevronDown} />
                    <Text style={styles.txtInfoTodos}>Voltar (Torneios do seu time)</Text>
                </View>
            </TouchableOpacity>
        );

        return items;
    }

    return (
        <View style={styles.container}>
            {isViewVisible && (
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: 65,
                            left: 0,
                            right: 0,
                            maxHeight: layout.height - 225,
                            // backgroundColor: '#141414',
                            backgroundColor: '#000',
                            borderWidth: 0.5,
                            borderColor: '#ffffff50',
                            borderRadius: 10,
                            justifyContent: 'center',
                            // alignItems: 'center',
                            borderRadius: 10,
                            marginHorizontal: 5,
                            zIndex: 99,
                            overflow: 'hidden',
                        },
                        viewStyle,
                    ]}
                >
                    {torneios && ((listaStatic)?
                    <ScrollViewIndicator indStyle={{
                        top: 2,
                        marginRight: 2,
                        backgroundColor: '#ffffff40'
                    }}>
                        <ListarTodos />
                    </ScrollViewIndicator>
                    :<Lista />)}
                </Animated.View>
            )}

            {isViewVisible && (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // backgroundColor: '#00000099',
                        backgroundColor: 'transparent',
                        zIndex: 98,
                    }}
                    onPress={handleOutsidePress}
                />
            )}
            <View>
                <TouchableOpacity onPress={handleButtonPress} style={styles.infoContainer}>
                    <View style={styles.info}>
                        {(torneio)? <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneio.id}/image/dark` }} />:''}
                        {(torneio)?
                        <Text style={styles.txtInfo}>{torneio.name}</Text>:
                        <Text style={styles.txtPlaceholder}>Selecione o torneio</Text>}
                    </View>
                    <Icon name="chevron-down" size={25} color="#434343" style={styles.chevronDown} />
                </TouchableOpacity>
            </View>

            {exibeTorneio()}
        </View>
    );
}
