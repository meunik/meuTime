import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 10,
    },
    playoffsLadoLado: {
        flex: 0,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 80,
        paddingVertical: 5,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#202020',
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
    row(direita) {
        return {
            flex: 1,
            flexDirection: direita?'row-reverse':'row',
            paddingHorizontal: 5,
            // borderWidth: 1,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderRadius: 10,
            borderColor: '#202020',
        };
    },
    rowFinal: {
        flexDirection: 'column-reverse',
    },
    jogosLadoLado: {
        justifyContent: 'space-around',
        gap: 10,
    },
    jogos: {
        width: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
    },
    final: {
        marginTop: -45,
        bottom: -45,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
    },
    finalBorda: {
        position: 'relative',
        backgroundColor: '#000',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderWidth: 1,
        borderColor: '#202020',
        borderTopColor: '#000',
        paddingBottom: 5,
        paddingHorizontal: 20,
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
        top: 3,
        position: 'absolute',
        paddingRight: 115,
    },
    campeaoRight: {
        top: 3,
        position: 'absolute',
        paddingLeft: 115,
    },
})