import { useSelector } from 'react-redux';

export const theme = {
    colors: {
        // fundo: '#121212',
        background() {
            const meuTime = useSelector(state => state.meuTime);
            return (meuTime) ? meuTime.teamColors.primary : '#000';
        },
        fundo: '#000',
        // nav: '#55A655',
        nav: '#d0d0d0',
        texto: {
            100: '#fff',
            200: '#bfbfbf',
            300: '#969696',
            nav: '#000',
            link: '#969696',
            linkAzul: '#5e84f1',
            btn: '#bfbfbf',
            tempo: '#3bb552',
        },
    },
    font: {
        size: {
            legendas: 8,
            1: 12,
            2: 14,
            3: 16,
            4: 18,
            5: 20,
            6: 22,
            7: 24,
        },
    },
    contentContainerStyle: {
        paddingBottom: 60
    },
    
};

export function theme2() {
    const meuTime = useSelector(state => state.meuTime);

    return {
        colors: {
            // async background() {
            //     const fetchedTime = await AsyncStorage.getItem('@meuTime');
            //     const meuTime = JSON.parse(fetchedTime);
            //     return (meuTime) ? meuTime.teamColors.primary : '#000';
            // },
            fundo: '#000',
            // nav: '#55A655',
            nav: '#d0d0d0',
            texto: {
                100: '#fff',
                200: '#bfbfbf',
                300: '#969696',
                nav: '#000',
                link: '#8ab4f8',
                tempo: '#3bb552',
            },
        },
        font: {
            size: {
                legendas: 8,
                1: 12,
                2: 14,
                3: 16,
                4: 18,
                5: 20,
                6: 22,
                7: 24,
            },
        },
        contentContainerStyle: {
            paddingBottom: 50
        },
        
    };
}
