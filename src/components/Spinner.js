
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { styles } from "@/src/global/styles/styles";
import { theme } from "@/src/global/styles/theme";

export function Spinner() {
    return (
        <View style={{
            flex: 1,
            paddingTop: (Platform.OS === 'ios') ? 0 : 10,
            backgroundColor: theme.colors.fundo,
            opacity: 0.8,
            gap: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={theme.colors.texto[300]} />
            <Text style={styles.txtInfo}>Carregando</Text>
        </View>
    )
}
