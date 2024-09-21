import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { ScrollViewIndicator } from '@fanchenbao/react-native-scroll-indicator';
import { torneios as getTorneios } from '@/src/store/store';
import { setTorneioList } from '@/src/store/action';
import { urlBase } from '@/src/store/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { listaTorneios as lt } from "@/src/store/listaTorneios";

import { styles } from "./styles";

export function SelectTorneios({ onTorneioChange }) {
    const meuTime = useSelector(state => state.meuTime);
    const torneioStorage = useSelector(state => state.torneio);
    const torneioList = useSelector(state => state.torneioList);
    const dispatch = useDispatch();

    const [torneio, setTorneio] = useState(torneioStorage);
    const [torneios, setTorneios] = useState(null);
    const [listaTorneios, setListaTorneios] = useState(lt);
    const [refreshing, setRefreshing] = useState(false);
    const [listaStatic, setTistaStatic] = useState(false);

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

    const buscaTorneio = async () => {
        setRefreshing(true);
        const torneiosFetch = await getTorneios(meuTime?.id);
    
        for (let i = 0; i < torneiosFetch.length; i++) {
            const filtrado = listaTorneios.filter(item => item.id == torneiosFetch[i].id);
            if (filtrado[0]) torneiosFetch[i] = filtrado[0];
            else torneiosFetch.splice(i, 1);
            
            check = torneioList.filter((item, key) => item.id == torneiosFetch[i].id);
            torneiosFetch[i].isInList = !!check.length;
        }
        
        for (let i = 0; i < listaTorneios.length; i++) {
            check = torneioList.filter((item, key) => item.id == listaTorneios[i].id);
            listaTorneios[i].isInList = !!check.length;
        }

        setTorneios(torneiosFetch);
        setListaTorneios(listaTorneios);
        onTorneioChange(torneioList);
        setRefreshing(false);
    };

    useEffect(() => {
        buscaTorneio();
    }, []);

    const addTorneioList = async (torneioObjeto) => {
        let att = torneioList;
        check = torneioList.filter((item, key) => item.id == torneioObjeto.id);
        if (!!check.length) att = torneioList.filter((item, key) => item.id !== torneioObjeto.id);
        else att = [...torneioList, torneioObjeto];
        // att = [];
        dispatch(setTorneioList(att));
        torneioObjeto.isInList = !torneioObjeto.isInList;
        setTorneios([...torneios]);
        onTorneioChange(att);
        // handleOutsidePress();
    };

    const Lista = () => {
        const items = [];
        for (let i = 0; i < torneios.length; i++) {
            items.push(
                <TouchableOpacity key={'torneios'+i} onPress={() => addTorneioList(torneios[i])}>
                    <View style={styles.infoSelect}>
                        {(torneios[i].isInList) 
                            ? <Icon name="star" size={25} color="#434343" />
                            : <Icon name="star-outline" size={25} color="#434343" />}
                        {torneios[i].id && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${torneios[i].id}/image/dark` }} />}
                        <Text style={styles.infoTxt}>{torneios[i] && torneios[i].name}</Text>
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

        items.push(
            <TouchableOpacity key={`listaTorneiosinico`} onPress={() => setTistaStatic(false)}>
                <View style={{...styles.infoSelect, justifyContent: 'flex-start', paddingVertical: 10,}}>
                    <Icon name="arrow-left-bold" size={25} color="#434343" style={styles.chevronDown} />
                    <Text style={styles.txtInfoTodos}>Voltar (Torneios do seu time)</Text>
                </View>
            </TouchableOpacity>
        );

        for (let i = 0; i < listaTorneios.length; i++) {
            if (listaTorneios[i].categoria) items.push(
                <TouchableOpacity key={'listaTorneios'+i} onPress={() => {}}>
                    <View style={{
                        ...styles.infoSelect,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        paddingTop: (i == 0) ? 10 : 30
                    }}>
                        <Icon name="format-list-text" size={25} color="#434343" style={styles.chevronDown} />
                        <Text style={styles.txtInfoTodos}>{listaTorneios[i] && listaTorneios[i].name}</Text>
                    </View>
                </TouchableOpacity>
            )
                
            else items.push(
                <TouchableOpacity key={'listaTorneios'+i} onPress={() => addTorneioList(listaTorneios[i])}>
                    <View style={styles.infoSelect}>
                        {(listaTorneios[i].isInList) 
                            ? <Icon name="star" size={25} color="#434343" />
                            : <Icon name="star-outline" size={25} color="#434343" />}
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
        <>
            <View style={{position:'relative'}}>
                <View>
                    <TouchableOpacity onPress={handleButtonPress} style={styles.infoContainer}>
                        <View style={{...styles.info, justifyContent: 'center', minHeight: 50}}>
                            <Icon name="format-list-text" size={25} color="#434343" style={{...styles.chevronDown, marginLeft: 20}} />
                            {/* <Text style={styles.txtPlaceholder}>Selecione os torneios</Text> */}
                            <Text style={styles.txtInfoTodos}>Selecione os torneios</Text>
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
                    {torneios && ((listaStatic)?
                    <ScrollViewIndicator indStyle={{
                        top: 2,
                        marginRight: 2,
                        backgroundColor: '#ffffff40'
                    }}>
                        <ListarTodos />
                    </ScrollViewIndicator>
                    :<Lista />)}
                </Animated.View>}
            </View>

            {isViewVisible && (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        position: 'absolute',
                        height: layout.height,
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
