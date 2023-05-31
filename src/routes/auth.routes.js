import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, FlatList, TouchableHighlight, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { setMeuTime } from '@/src/store/action';
import { time } from '@/src/store/store';
import { url, urlTime } from '@/src/store/api';

import { Jogos } from "@/src/screens/Jogos";
import { Tabela } from "@/src/screens/Tabela";
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";

import { createStackNavigator } from '@react-navigation/stack';
import { Artilheiros as BrasileiraoArtilheiros } from "@/src/screens/Tabela/Artilheiros";
import { Jogos as BrasileiraoJogos } from "@/src/screens/Tabela/Jogos";
import { Times } from "@/src/screens/Times";

const FirstRoute = () => (
    <Jogos />
);

const SecondRoute = () => (
    <Tabela />
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
        { key: 'second', title: 'Tabela' },
    ]);

    const renderTabBar = props => (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Times')} underlayColor="transparent">
                <View style={styles.logo}>
                    <Image
                        style={styles.img}
                        resizeMode="center"
                        source={{ uri: `${urlTime}${meuTime && meuTime.id}/image` }}
                    />
                    <Text style={styles.txtLogo}>{meuTime && meuTime.shortName}</Text>
                </View>
            </TouchableHighlight>
            <TabBar
                {...props}
                labelStyle={styles.labelStyle}
                indicatorStyle={styles.ativo}
                style={styles.navContainer}
            />
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
                        initialLayout={{ width: 20 }}
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
                    name="BrasileiraoJogos"
                    component={BrasileiraoJogos}
                />
                <Screen
                    name="BrasileiraoArtilheiros"
                    component={BrasileiraoArtilheiros}
                />
                <Screen
                    name="Times"
                    component={Times}
                />
            </Group>
        </Navigator>
    );
}