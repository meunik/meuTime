import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fundo,
    },
    voltar: {
        marginRight: 5,
        paddingLeft: 15,
        paddingVertical: 10,
    },
    txt: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[4],
    },
    txtX: {
        color: theme.colors.texto[300],
        paddingHorizontal: 10,
    },
    txtTitulo: {
        color: theme.colors.texto[100],
        paddingHorizontal: 10,
        marginTop: 20,
        paddingVertical: 10,
        fontSize: theme.font.size[5],
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
    },
    txtLegenda: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size.legendas,
        textAlign: 'right',
        // paddingHorizontal: 10,
    },
    jogosRodada: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nomeTabela: {
        marginTop: 30,
        marginBottom: 10,
    },
    btn: {
        borderWidth: 0.5,
        borderColor: '#ffffff20',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
    },
    linksContainer: {
        paddingVertical: 5,
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
    txtPosicao(item) {
        let cor = '#fff';
        if (item.promotion) {
            switch (item.promotion.id) {
                case 20: cor = '#000'; break;
                case 19: cor = '#fff'; break;
                case 21: cor = '#000'; break;
                case 22: cor = '#000'; break; // Rebaixamento
                case 3: cor = '#000'; break;
            
                default: cor = '#fff'; break;
            }
        }
        return {
            color: cor,
        }
    },
    posicao(item, campeao) {
        let cor = '#333';
        if (item.promotion) {
            switch (item.promotion.id) {
                case 19: cor = '#004fd9'; break; // AzulEscuro
                case 20: cor = '#45a1f3'; break; // AzulClaro
                case 21: cor = '#3bb552'; break; // Verde

                case 6: cor = (campeao && item.position == 1)?'#dbb234':'#004fd9'; break; //Amarelo/AzulEscuro
                case 14: cor = '#45a1f3'; break; // AzulClaro
                case 35: cor = '#3bb552'; break; // Verde

                case 22: cor = '#ef5158'; break; // Vermelha
                case 3: cor = '#ef5158'; break; // Vermelha
            
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
    bolinhaCampeao: {
        backgroundColor: '#dbb234',
        borderRadius: 50,
        width: 6,
        height: 6,
        alignSelf: 'center',
    },
    bolinhaAzulEscuro: {
        backgroundColor: '#004fd9',
        borderRadius: 50,
        width: 6,
        height: 6,
        alignSelf: 'center',
    },
    bolinhaAzulClaro: {
        backgroundColor: '#45a1f3',
        borderRadius: 50,
        width: 6,
        height: 6,
        alignSelf: 'center',
    },
    bolinhaVerde: {
        backgroundColor: '#3bb552',
        borderRadius: 50,
        width: 6,
        height: 6,
        alignSelf: 'center',
    },
    bolinhaVermelha: {
        backgroundColor: '#ef5158',
        borderRadius: 50,
        width: 6,
        height: 6,
        alignSelf: 'center',
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})