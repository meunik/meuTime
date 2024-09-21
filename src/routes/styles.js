import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        paddingBottom: 2,
        backgroundColor: theme.colors.nav,
        // backgroundColor: '#590000',
        borderRadius: 10,
        position: 'absolute',
        left: 3,
        right: 3,
        // bottom: -10,
        bottom: 5,
        alignSelf: 'center',
    },
    labelStyle: {
        flex: 1,
        color: theme.colors.texto.nav,
    },
    buttonActive: {
        color: '#fff',
    },
    navContainer: {
        width: 300,
        // width: 160,
        backgroundColor: 'transparent',
        // backgroundColor: 'red',
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 10,
    },
    tabContainer: {
        marginHorizontal: -15,
    },
    scrollContainer: {
        // flexDirection: 'row', // Define a direção do conteúdo como horizontal
    },
    item: {
        width: 100, // Largura de cada item
        height: 100, // Altura de cada item
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 5,
    },
    ativo: {
        backgroundColor: '#000',
        alignSelf: 'center',
    },
    img: {
        height: 25,
        width: 25,
    },
    logo: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    txtLogo: {
        color: theme.colors.texto.nav,
        fontWeight: 'bold',
        fontSize: theme.font.size[4],
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
        zIndex: 1,
    },
    contentContainerStyle: {
        // paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})