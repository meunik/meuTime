import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 10,
    },
    playoffsLadoLado: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // paddingVertical: 20,
        minHeight: 200,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff20',
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
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    jogosLadoLadoSemiDireita: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        left: 30,
    },
    jogosLadoLadoSemiEsquerda: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        right: 30,
    },
    jogosLadoLadoSemi: {
        height: '100%',
        justifyContent: 'space-evenly',
    },
    jogosLadoLadoQuartasEsquerda: {
        // height: '100%',
        // justifyContent: 'space-evenly',
        height: '60%',
        justifyContent: 'space-between',
        marginRight: 25,
    },
    jogosLadoLadoQuartasDireita: {
        // height: '100%',
        // justifyContent: 'space-evenly',
        height: '60%',
        justifyContent: 'space-between',
        marginLeft: 25,
    },
    jogosLadoLadoQuartas: {
        height: '100%',
        justifyContent: 'space-evenly',
    },
    jogosLadoLado: {
        flex: 1,
        alignItems: 'center',
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
        position: 'absolute',
        right: 1,
        left: 1,
        top: 3,
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