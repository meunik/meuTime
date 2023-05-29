import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fundo,
    },
    txt: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[4],
    },
    txtPontos: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
        textAlign: 'center',
        width: 15,
    },
    txtInfo: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
    },
    txtInfoPontos: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
        textAlign: 'center',
        width: 15,
    },
    txtLegenda: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size.legendas,
        textAlign: 'right',
        paddingHorizontal: 10,
    },
    txtPosicao: {
        color: '#fff',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    infoArtilheiros: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    imgCampeonato: {
        height: 50,
        width: 50,
    },
    listaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    lista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff0d',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
    },
    listContainer: {
      flex: 1,
    },
    time: {
        flexDirection: 'row',
        gap: 10,
    },
    imgTime: {
        height: 30,
        width: 30,
    },
    pontos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    posicao: {
        backgroundColor: '#333',
        borderRadius: 50,
        width: 27,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})