import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableHighlight, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { urlTime } from '@/src/store/api';
import { styles } from "./styles";

import { TodosJogos } from "@/src/components/TodosJogos";

import { Jogos } from "@/src/screens/Jogos";
import { Campeonatos } from "@/src/screens/Campeonatos";
import { Artilheiros as BrasileiraoArtilheiros } from "@/src/screens/Campeonatos/Tabela/Artilheiros";
import { Artilheiros } from "@/src/screens/Artilheiros";
import { Jogos as BrasileiraoJogos } from "@/src/screens/Campeonatos/Tabela/Jogos";
import { Times } from "@/src/screens/Times";
import { Partida } from "@/src/screens/Partida";

const FirstRoute = () => (
    <Jogos />
);

const SecondRoute = () => (
    <Campeonatos />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export function AuthRoutes() {
	const navigation = useNavigation();
    const { Navigator, Screen, Group } = createStackNavigator();
    const layout = useWindowDimensions();

    const meuTime = useSelector(state => state.meuTime);
    
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Jogos' },
        { key: 'second', title: 'Tabelas' },
    ]);

    const renderTabBar = props => (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Times')} underlayColor="#00000030">
                <View style={styles.logo}>
                    <Image
                        style={styles.img}
                        resizeMode="center"
                        source={{ uri: `${urlTime}${meuTime && meuTime.id}/image` }}
                    />
                    {layout.width > 350 && <Text style={styles.txtLogo}>{meuTime && meuTime.shortName}</Text>}
                </View>
            </TouchableHighlight>
            <TabBar
                {...props}
                labelStyle={styles.labelStyle}
                indicatorStyle={styles.ativo}
                style={styles.navContainer}
                tabStyle={styles.tabContainer}
            />
            <TouchableHighlight onPress={() => navigation.navigate('Times')} underlayColor="#00000030">
                <Icon name="cog" size={20} color="#000" />
            </TouchableHighlight>
        </View>
    );

    return (
        <Navigator
            initialRouteName={(meuTime)?"inicial":"Times"}
            screenOptions={({ route }) => ({
                headerShown: (route.name == 'Id') ? true : false,
                headerLeft: false,
            })}
        >
            <Screen name="inicial">
                {() => (
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        tabBarPosition='bottom'
                        onIndexChange={setIndex}
                        // initialLayout={{ width: layout.width }}
                        // initialLayout={{ width: 20 }}
                        renderTabBar={renderTabBar}
                    />
                )}
            </Screen>
            <Group
                screenOptions={{
                    headerStyle: {
                        height: (Platform.OS === 'ios') ? 45 : 25,
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                }}
            >
                <Screen
                    name="TodosJogos"
                    component={TodosJogos}
                />

                <Screen
                    name="BrasileiraoJogos"
                    component={BrasileiraoJogos}
                />
                <Screen
                    name="BrasileiraoArtilheiros"
                    component={BrasileiraoArtilheiros}
                />
                <Screen
                    name="Artilheiros"
                    component={Artilheiros}
                />
                <Screen
                    name="Times"
                    component={Times}
                />
                <Screen
                    name="Partida"
                    component={Partida}
                />
            </Group>
        </Navigator>
    );
}