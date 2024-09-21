import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 10,
        backgroundColor: theme.colors.fundo,
    },
    contentContainerStyle: {
        flex: 1,
    },
    tabsContainer: {
        paddingHorizontal: 20,
    },
    estatisticaContainer: {
        paddingTop: 10,
        gap: 10,
    },
    gol: {
        alignSelf: 'center',
    },
    assistIcon: {
        paddingRight: 2.5,
        alignSelf: 'center',
    },
    btnVoltar: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
    },
    voltar: {
        marginRight: 5,
        paddingLeft: 15,
        paddingVertical: 10,
    },
    lista: {
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    linha: {
        borderColor: '#ffffff30',
        borderBottomWidth: 0.5,
        paddingTop: 10,
    },
    linhaPH: {
        borderColor: '#ffffff30',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        marginBottom: 10,
    },
    linhaVert: {
        borderColor: '#ffffff30',
        borderRightWidth: 0.7,
        paddingLeft: 1,
        marginRight: 1,
    },
    txtTitulo: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[6],
    },
    txtMenor: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[2],
    },
    txtMuitoMenor: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
    },
    txtEstatisticasNum: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[4],
    },
    txtEstatisticasNome: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
    },
    txtIncidents: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
    },
    txtAnuncioAcrescimos: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtSaiu: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
    },
    txtEntrou: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
    },
    txtNome: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
    },
    txtIncidentsTempo: {
        color: theme.colors.texto[200],
        fontSize: theme.font.size[1],
    },
    txtAcrescimos: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1]-3,
    },
    txtVar: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1]-3,
    },

    divEscalacaoNome: {
        gap: 2,
    },
    txtEscalacaoNome: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1],
    },
    divInfoEscalacao: {
        alignItems: 'center',
        gap: 2,
    },
    infoEscalacaoNome: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1]-3,
        alignItems: 'center',
        alignSelf: 'center',
    },

    bolinhaNum: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 40,
        paddingHorizontal: 10,
        paddingVertical: 2,
        // backgroundColor: 'red',
        borderRadius: 50,
    },
    imgEscalacao: {
        height: 25,
        width: 25,
        borderRadius: 50,
    },
    rowEscalacao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    rowEscalacaoJogador: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },

    infoEsquerda: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
        textAlign: 'left',
        flex: 1,
    },
    infoDireita: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
        textAlign: 'right',
        flex: 1,
    },
    
    txtTecnicosNomeEsquerda: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1]+2,
        fontWeight: 'bold',
    },
    txtTecnicosNomeDireita: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1]+2,
        fontWeight: 'bold',
    },

    rowTecnicos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff30',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        gap: 20,
    },
    rowTecnico: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
    rowEstatistica: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    txtHighlights: {
        color: theme.colors.texto[100],
        maxWidth: 150,
    },
    txtSubtitle: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
        maxWidth: 150,
    },
    pyHighlights: {
        paddingVertical: 10,
    },
    imgHighlightsBox: {
        height: 110,
        width: 150,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    imgHighlights: {
        flex: 1,
    },
    play: {
        position: 'absolute',
        flex: 1,
        alignSelf: 'center',
    },
    rowHighlights: {
        flexDirection: 'row',
        gap: 10,
    },
    flexUm: {
        flex: 1,
    },
    infoBox: {
        gap: 10,
    },
    rowInfos: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    rowEnd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 5,
    },
    imgBandeira: {
        height: 14,
        width: 14,
        borderRadius: 50,
    },
    cartao: {
        transform: [{ rotate: '90deg'}]
    },
    cartaoDiv: {
        flexDirection: 'row',
        gap: -1,
    },
    gk: {
        transform: [{ rotate: '45deg'}]
    },
    gkDiv: {
        gap: -6,
    },
    gkTxt: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[1]-6,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#ffffff',
        paddingLeft: 2.5,
        paddingRight: 1,
        paddingTop: 2,
        paddingBottom: 1,
        borderRadius: 50,
    },
    containerHistorico: {
        paddingVertical: 2.5,
    },
})