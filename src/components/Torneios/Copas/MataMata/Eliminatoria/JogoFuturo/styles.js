import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 10,
        backgroundColor: theme.colors.fundo,
        // backgroundColor: theme.colors.background(),
        // backgroundColor: '#000000d9',
        paddingHorizontal: 20,
    },
    txtLogo: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[7],
    },
    txtData: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtTempo: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtX: {
        color: theme.colors.texto[300],
    },
    txtPenaltis: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1] - 2,
    },
    txtcampeonato: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtTime: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[6],
    },
    img: {
        height: 50,
        width: 50,
    },
    logo: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    lista: {
        borderColor: '#ffffff0d',
        // borderColor: 'transparent',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    rodape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    jogo: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 10,
    },
    campeonato: {
        height: 60,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgCampeonato: {
        height: 50,
        width: 50,
    },
    jogoRolando: {
        paddingBottom: 10,
    },
    jogoRolando(valor, valorFinal = 0) {
        return {
            height: valorFinal || valor,
            paddingHorizontal: valorFinal?10:0,
        };
    },
    placarPenaltis(valor) {
        return {
            position: 'absolute',
            top: ((valor?valor:100)/2)+7,
            right: 0,
            left: 0,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
        }
    },
    timesUltimoJogo: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 5,
    },
    timesFinal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 5,
    },
    times: {
        width: '100%',
        position: 'absolute',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 5,
    },
    timeCasa: {
        // width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 20,
        // gap: 2,
    },
    timeVisitante: {
        // width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 2,
    },
    imgLista(valor) {
        return {
            height: (valor)?valor:40,
            width: (valor)?valor:40,
        }
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
    cartaoVermelho: {
        transform: [{ rotate: '90deg'}]
    },
    cartaoVermelhoContainer: {
        flexDirection: 'row',
        gap: -1,
    },
})