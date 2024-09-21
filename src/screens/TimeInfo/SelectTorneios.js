import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { torneios as getTorneios } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from "./styles";

export function SelectTorneios({ onTorneioChange }) {
    const meuTime = useSelector(state => state.meuTime);
    const torneioStorage = useSelector(state => state.torneio);
    const todos = {
        id: null,
        name: "Todos",
        slug: "total",
    };

    const [torneio, setTorneio] = useState(torneioStorage);
    const [torneios, setTorneios] = useState(null);

    const layout = useWindowDimensions();

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
    };

    const interpolatedY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-2, 0],
    });

    const viewStyle = {
        opacity: animation,
        transform: [{ translateY: interpolatedY }],
    };

    const buscaTorneio = async () => {
        setTorneios(await getTorneios(meuTime?.id));
    };

    useEffect(() => {
        buscaTorneio();
        setTorneio(todos);
        onTorneioChange('total');
    }, []);

    const selecionaTorneio = async (torneioObjeto) => {
        setTorneio(torneioObjeto);
        onTorneioChange(torneioObjeto.id);
        handleOutsidePress();
    };
    const selecionaTodos = async () => {
        setTorneio(todos);
        onTorneioChange('total');
        handleOutsidePress();
    };

    const Lista = () => {
        console.log(torneios);
        
        const items = [];
        for (let i = 0; i < torneios.length; i++) {
            items.push(
                <TouchableOpacity key={'torneios'+i} onPress={() => selecionaTorneio(torneios[i])}>
                    <View style={styles.infoSelect}>
                        {torneios[i].id && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneios[i].id}/image/dark` }} />}
                        <Text style={styles.infoTxt}>{torneios[i] && torneios[i].name}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        items.push(
            <TouchableOpacity key={`torneios${torneios.length}`} onPress={() => selecionaTodos()}>
                <View style={{...styles.infoSelect, justifyContent: 'center', paddingVertical: 10,}}>
                    <Icon name="format-list-text" size={25} color="#434343" style={styles.chevronDown} />
                    <Text style={styles.txtInfoTodos}>Todos</Text>
                </View>
            </TouchableOpacity>
        );

        return items;
    }

    return (
        <>
            <View style={{position:'relative'}}>
                <View>
                    <TouchableOpacity onPress={handleButtonPress} style={styles.infoContainer}>
                        <View style={{...styles.info, justifyContent: 'center', minHeight: 50}}>
                            {(torneio.id)
                                ?<Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneio.id}/image/dark` }} />
                                :<Icon name="format-list-text" size={25} color="#434343" style={{...styles.chevronDown, marginLeft: 20}} />}

                            {(torneio)
                                ?<Text style={styles.infoTxt}>{torneio.name}</Text>
                                :<Text style={styles.txtPlaceholder}>Selecione o torneio</Text>}
                        </View>
                        <Icon name="chevron-down" size={25} color="#434343" style={styles.chevronDown} />
                    </TouchableOpacity>
                </View>
                {isViewVisible && <Animated.View
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
                    {torneios && <Lista />}
                </Animated.View>}
            </View>

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
        </>
    );
}
