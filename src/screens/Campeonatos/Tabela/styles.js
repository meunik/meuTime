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
    txtLink: {
        color: theme.colors.texto.btn,
        fontSize: theme.font.size[2],
    },
    txtInfoPontos: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
        textAlign: 'center',
        width: 15,
    },
    boxLegenda: {
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 0,
    },
    txtLegenda: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size.legendas,
        textAlign: 'right',
        // paddingHorizontal: 10,
    },
    txtPosicao(item, legenda = null) {
        let cor = '#fff';
        if (item.promotion && legenda) {
            try {
                filtrado = legenda.filter(leg => leg.id == item.promotion.id);
                cor = filtrado[0].textHexa;
            } catch (error) {}
        }
        return {
            color: cor,
        }
    },
    txtTitulo: {
        color: theme.colors.texto[100],
        paddingHorizontal: 10,
        marginTop: 20,
        paddingVertical: 10,
        fontSize: theme.font.size[5],
    },
    jogosRodada: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        borderWidth: 0.5,
        borderColor: '#ffffff20',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 10,
    },
    linksContainer: {
        paddingVertical: 5,
        flex: 1,
        gap: 5,
    },
    infoSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        gap: 10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ffffff20',
        borderRadius: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        paddingVertical: 5,
    },
    chevronDown: {
        marginRight: 5,
    },
    infoArtilheiros: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgCampeonato: {
        height: 50,
        width: 50,
    },
    listaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 5,
        gap: 5,
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
        justifyContent: 'flex-end',
        gap: 5,
    },
    pontosDiv: {
        gap: 5,
    },
    posicao(item, legenda = null) {
        let cor = '#333';
        if (item.promotion && legenda) {
            try {
                filtrado = legenda.filter(leg => leg.id == item.promotion.id);
                cor = filtrado[0].hexa;
            } catch (error) {}
        }
        return {
            backgroundColor: cor,
            borderRadius: 50,
            width: 27,
            height: 27,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    bolinha(hexa) {
        return {
            backgroundColor: hexa,
            borderRadius: 50,
            width: 6,
            height: 6,
            alignSelf: 'center',
        }
    },
    bolinhaEvento(status) {
        let cor = 'transparent';
        switch (status) {
            case 1: cor = '#3bb552'; break;
            case 2: cor = '#ef5158'; break;
            case 3: cor = '#fff'; break;
            default: cor = 'transparent'; break;
        }
        return {
            backgroundColor: cor,
            borderRadius: 50,
            width: 6,
            height: 6,
            alignSelf: 'center',
        }
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})