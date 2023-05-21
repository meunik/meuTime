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
        color: theme.colors.texto.link,
        fontSize: theme.font.size[2],
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
    txtPosicao(item) {
        let cor = '#fff';
        if (item.promotion) {
            switch (item.promotion.id) {
                case 20: cor = '#000'; break;
                case 19: cor = '#fff'; break;
                case 21: cor = '#000'; break;
                case 3: cor = '#000'; break;
            
                default: cor = '#fff'; break;
            }
        }
        return {
            color: cor,
        }
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
    posicao(item) {
        let cor = '#333';
        if (item.promotion) {
            switch (item.promotion.id) {
                case 20: cor = '#45a1f3'; break;
                case 19: cor = '#004fd9'; break;
                case 21: cor = '#3bb552'; break;
                case 3: cor = '#ef5158'; break;
            
                default: cor = '#333'; break;
            }
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
    bolinhaLiberta: {
        backgroundColor: '#004fd9',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bolinhaPreLiberta: {
        backgroundColor: '#45a1f3',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bolinhaSula: {
        backgroundColor: '#3bb552',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bolinhaRebaixados: {
        backgroundColor: '#ef5158',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})