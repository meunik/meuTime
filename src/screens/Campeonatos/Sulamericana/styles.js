import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 10,
        backgroundColor: theme.colors.fundo,
    },
    containerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        paddingBottom: 12,
        backgroundColor: theme.colors.nav,
        borderRadius: 10,
        position: 'absolute',
        left: 3,
        right: 3,
        bottom: -10,
        alignSelf: 'center',
    },
    labelStyle: {
        color: theme.colors.texto.nav,
    },
    navContainer: {
        width: 170,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 10,
    },
    ativo: {
        backgroundColor: '#000',
        alignSelf: 'center',
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
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
    linksContainer: {
        paddingVertical: 5,
        // gap: 5,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 10,
    },
    listaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 5,
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
                case 6: cor = '#004fd9'; break; // Oistavas da final
                case 14: cor = '#45a1f3'; break; // Playoffs Oistavas da final
            
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
    bolinhaOitavas: {
        backgroundColor: '#004fd9',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bolinhaPlayoffsOitavas: {
        backgroundColor: '#45a1f3',
        borderRadius: 50,
        width: 6,
        height: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
})