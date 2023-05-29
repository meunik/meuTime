
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Text, View, Image } from 'react-native';
import { brasileiraoJogosDepois, brasileiraoJogosAntes } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import * as NavigationBar from 'expo-navigation-bar';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { tempoJogo } from "@/src/Utils/TempoJogo";

const Rodadas = (jogos) => {console.log(jogos);}
// const Rodadas = (jogos) => (
//     <View style={styles.container}>
//         <FlatList
//             contentContainerStyle={styles.contentContainerStyle}
//             data={jogos}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             refreshControl={
//                 <RefreshControl
//                     refreshing={refreshing}
//                     onRefresh={onRefresh}
//                 />
//             }
//         />
//     </View>
// );

// const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
// });

export function Jogos() {
    // NavigationBar.setBackgroundColorAsync(theme.colors.fundo);
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

	const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const meuTime = useSelector(state => state.meuTime);
    const intervalo = useSelector(state => state.intervalo);

    const [futurosJogos, setFuturosJogos] = useState(null);
    const [passadoJogos, setPassadoJogos] = useState(null);
    const [todosJogos, setTodosJogos] = useState(null);
    const [jogos, setJogos] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        const jogosFuturos = await brasileiraoJogosDepois();
        const jogosPassado = await brasileiraoJogosAntes();
        // console.log(jogosFuturos);
        // console.log(jogosPassado);
        const jogosTodos = [
            ...jogosPassado.events,
            ...jogosFuturos.events,
        ];

        let jogosPorRodadas = {};
        jogosTodos.forEach(jogo => {
            const round = jogo.roundInfo.round;
            
            if (!jogosPorRodadas[round]) {
                jogosPorRodadas[round] = [];
            }
            
            jogosPorRodadas[round].push(jogo);
        });
        // console.log(jogosTodos);
        console.log(jogosPorRodadas);
        setJogos(jogosPorRodadas);

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };
    
    useEffect(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const [index, setIndex] = useState(0);
    // const [routes, setRoutes] = useState([]);
    const [routes] = React.useState([
        { key: 'first', title: 'Jogos' },
        { key: 'second', title: 'Tabela' },
    ]);

    const Teste = (item) => { console.log(item); return (
        <View>
            <Text style={styles.txtInfo}>Teste</Text>
        </View>
    )};

    // const renderScene = SceneMap({
    //     first: () => <Teste valor={1} />,
    //     second: Teste,
    // });

    // const renderScene = seila();

    const renderScene = () => {
        let rodadas = {};
        let routs = [];

        console.log('renderScene');
        // console.log(jogos);
        if (jogos) {
            jogos.forEach((item, index) => {
                routs.push({ key: index, title: `Rodada ${index}` });
    
                // routs[index] = { key: index, title: `Rodada ${index}` };

                // if (!jogos[index]) {
                //     jogos[index] = [];
                // }
                
                rodadas[index].push(() => <Teste valor={1} />);
                // rodadas[index] = () => <Rodadas valor={item} />;
            });
            // setRoutes(routs);
        }
        console.log('--------');
        console.log(routs);
        console.log(rodadas);

        const scenes = {
            first: () => <Teste valor={1} />,
            // second: Teste,
        };
      
        return ({ route }) => {
            const SceneComponent = scenes[route.key];
            return <SceneComponent />;
        };

        
        // return (rodadas) ? SceneMap(rodadas) : SceneMap({});
    };

    const renderTabBar = props => (
        <View style={styles.containerNav}>
            <TabBar
                {...props}
                labelStyle={styles.labelStyle}
                indicatorStyle={styles.ativo}
                style={styles.navContainer}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene()}
                tabBarPosition='bottom'
                onIndexChange={setIndex}
                // initialLayout={{ width: layout.width }}
                initialLayout={{ width: 20 }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 10,
        backgroundColor: theme.colors.fundo,
        // backgroundColor: theme.colors.background(),
        // backgroundColor: '#000000d9',
        // paddingHorizontal: 20,
    },
    containerNav: {
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
    txtInfo: {
        color: theme.colors.texto[300],
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
