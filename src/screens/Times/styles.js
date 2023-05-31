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
    txt: {
        color: theme.colors.texto[100],
        fontWeight: 'bold',
        fontSize: theme.font.size[5],
    },
    txtInfo: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
        paddingVertical: 10,
        textAlign: 'center',
    },
    lista: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderColor: '#ffffff0d',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
        gap: 10,
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
})