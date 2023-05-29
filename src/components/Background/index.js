import React, { useEffect, useState } from 'react';
import { styles } from './styles'
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMeuTime } from '@/src/store/action';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Background({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTime = await AsyncStorage.getItem('@meuTime');
            dispatch(setMeuTime(JSON.parse(fetchedTime)));
        };

        fetchData();
    }, [dispatch]);

    const meuTime = useSelector(state => state.meuTime);

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}