import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const stylesFuturo = StyleSheet.create({
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
        fontSize: theme.font.size[4],
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
    timesUltimoJogo(vertical) {
        return {
            flex: 1,
            flexDirection: vertical?'column':'row',
            alignItems: 'center',
            justifyContent: 'center',
        };
    },
    times: {
        width: '100%',
        position: 'absolute',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    timeCasa: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 20,
        gap: 5,
    },
    timeVisitante: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    centralizado: {
        alignItems: 'center',
        justifyContent: 'center',
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



export const stylesAtivo = StyleSheet.create({
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
        fontSize: theme.font.size[2],
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
    jogoRolando(valor) {
        return {
            height: valor?valor:null,
            paddingVertical: 13,
            alignItems: 'center',
            justifyContent: 'center',
        };
    },
    placarPenaltis(valor, vertical, direita) {
        let p = {};
        p = vertical ? {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: direita?22:1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        } : {
            position: 'absolute',
            // top: ((valor?valor:100)/2)+5,
            top: 25,
            bottom: 0,
            right: 0,
            left: 0,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
        }

        return p;
    },
    timesUltimoJogo(vertical) {
        return {
            flex: 0,
            flexDirection: vertical?'column':'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: vertical?-3:0,
            // backgroundColor: 'red',
        };
    },
    times: {
        width: '100%',
        position: 'absolute',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    timeCasa(vertical) {
        return {
            flexDirection: (vertical) ? null : 'row',
            alignItems: 'center',
            gap: vertical?0:3,
            // backgroundColor: 'red',
        };
    },
    timeVisitante(vertical) {
        return {
            flexDirection: (vertical) ? null : 'row',
            alignItems: 'center',
            gap: vertical?0:3,
        };
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
        position: 'absolute',
        flexDirection: 'row',
        gap: -1,
    },
    cartaoVermelhoContainerEsquerda(vertical) {
        return {
            position: 'absolute',
            flexDirection: 'row',
            top: vertical ? -12 : null,
            left: vertical ? null : -10,
            gap: -1,
            alignSelf: vertical?null:'flex-end',
        };
    },
    cartaoVermelhoContainerDireita(vertical) {
        return {
            position: 'absolute',
            flexDirection: 'row',
            bottom: vertical ? -12 : null,
            right: vertical ? null : -10,
            gap: -1,
            alignSelf: vertical?null:'flex-end',
        };
    },
})