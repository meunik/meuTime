import { StyleSheet } from 'react-native'
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 50 : 40,
        backgroundColor: theme.colors.fundo
    }
})