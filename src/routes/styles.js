import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: theme.colors.nav,
        borderRadius: 10,
        position: 'absolute',
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
        width: 200,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 50,
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
        fontSize: theme.font.size[5],
    },
})