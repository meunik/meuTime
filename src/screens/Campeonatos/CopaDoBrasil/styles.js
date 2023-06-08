import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 10,
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    playoffs: {
        justifyContent: 'space-around',
        paddingVertical: 20,
        height: '100%',
        bottom: 1,
        gap: 10,
    },
    imgTime: {
        height: 30,
        width: 30,
    },
    jogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff20',
        padding: 10,
    },
    semiFinal: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    txtRodada: {
        color: theme.colors.texto[300],
        textAlign: 'center',
    },
    txtX: {
        color: theme.colors.texto[300],
    },
    txtTime: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[6],
    },
    campeaoLeft: {
        position: 'absolute',
        paddingRight: 140,
    },
    campeaoRight: {
        position: 'absolute',
        paddingLeft: 140,
    },
})