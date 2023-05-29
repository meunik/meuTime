import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        paddingBottom: 12,
        backgroundColor: theme.colors.nav,
        // backgroundColor: '#590000',
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
    buttonActive: {
        color: '#fff',
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