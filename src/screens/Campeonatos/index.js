import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setTorneio as setTorneioStorage } from '@/src/store/action';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { listaTorneios } from "@/src/store/listaTorneios";
import { brasileirao, torneios as getTorneios } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Tabela } from "@/src/screens/Campeonatos/Tabela/index";
import { CopaDoBrasil } from "@/src/screens/Campeonatos/CopaDoBrasil/index";

import { CopaNordeste } from "@/src/screens/Campeonatos/CopaNordeste/index";
import { Carioca } from "@/src/screens/Campeonatos/Carioca/index";

import { Sulamericana } from "@/src/screens/Campeonatos/Sulamericana/index";
import { Libertadores } from "@/src/screens/Campeonatos/Libertadores/index";

export function Campeonatos() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

	const navigation = useNavigation();
    const meuTime = useSelector(state => state.meuTime);
    const torneioStorage = useSelector(state => state.torneio);
    const dispatch = useDispatch();

    const [tabela, setTabela] = useState(null);
    const [torneio, setTorneio] = useState(torneioStorage);
    const [torneios, setTorneios] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [listaStatic, setTistaStatic] = useState(false);

    const fetchDataTabela = async () => {
        setTabela(await brasileirao());
        setTorneios(await getTorneios(meuTime?.id));
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        setRefreshing(true);
        fetchDataTabela();
    }, [meuTime]);

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

    const selecionaTorneio = (torneioObjeto) => {
        if (torneioSeuTime(torneioObjeto)) {
            dispatch(setTorneioStorage(torneioObjeto));
            setTorneio(torneioObjeto);
        } else {
            setTorneio(torneioObjeto);
        }
        handleOutsidePress();
    };

    const exibeTorneio = () => {
        if (torneio) {
            switch (torneio.id) {
                case 325: return <Tabela />;
                case 373: return <CopaDoBrasil />;

                case 1596: return <CopaNordeste />;
                case 92: return <Carioca />;
                
                case 480: return <Sulamericana />;
                case 384: return <Libertadores />;
            
                default: return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.txtInfo}>Indisponível no momento</Text>
                    </View>
                );
            }
        }
        return null;
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
                        },
                        viewStyle,
                    ]}
                >
                    {torneios && ((listaStatic)?<ListarTodos />:<Lista />)}
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
