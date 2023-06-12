import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 10,
    },
    playoffs: {
        flexDirection: 'row',
        paddingVertical: 20,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff20',
    },
    playoffsVertical: {
        flexDirection: 'column-reverse',
        paddingVertical: 20,
        gap: 10,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff20',
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
    },
    jogos: {
        width: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
    },
    jogosVertical: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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