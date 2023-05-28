import React from 'react'
import { styles } from './styles'
import { View } from 'react-native';
import { useSelector } from 'react-redux';


export function Background({ children }) {

    const meuTime = useSelector(state => state.meuTime);

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}