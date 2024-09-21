import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fundo,
    },
    img: {
        height: 40,
        width: 40,
    },
    imgCampeonato: {
        height: 50,
        width: 50,
    },
    logo: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    txtInfo: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
        paddingVertical: 10,
        textAlign: 'center',
    },
    txtPlaceholder: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
        margin: 10,
    },
    txtLogo: {
        color: theme.colors.texto[100],
        fontWeight: 'bold',
        fontSize: theme.font.size[10],
    },
    txtInfoTodos: {
        color: theme.colors.texto.linkAzul,
        fontSize: theme.font.size[4],
        textAlign: 'center',
    },
    txtEstatisticasNum: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[4],
    },
    txtEstatisticasNome: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[1],
    },
    
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoTxt: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
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
    infoSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        gap: 10,
    },
    
    chevronDown: {
        marginRight: 5,
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
    linhaPH: {
        borderColor: '#ffffff30',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        marginBottom: 10,
    },
    rowEstatistica: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    tabsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 70,
    },
    estatisticaContainer: {
        paddingTop: 10,
        gap: 10,
    },
})