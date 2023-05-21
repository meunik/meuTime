import React, { useEffect, useState } from 'react';
import { time } from '@/src/store/store';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { url } from '@/src/store/api';
import { Jogos } from "@/src/screens/Jogos";
import { Tabela } from "@/src/screens/Tabela";
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";

import { createStackNavigator } from '@react-navigation/stack';
import { Artilheiros } from "@/src/screens/Artilheiros";

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
    const { Navigator, Screen, Group } = createStackNavigator();
    const layout = useWindowDimensions();

    const [meuTime, setMeuTime] = useState(null);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Jogos' },
        { key: 'second', title: 'Tabela' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setMeuTime(await time());
        };

        fetchData();
    }, []);

    const renderTabBar = props => (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={styles.img}
                    resizeMode="center"
                    source={{ uri: `${url}image` }}
                />
                <Text style={styles.txtLogo}>{meuTime && meuTime.name}</Text>
            </View>
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
            initialRouteName="inicial"
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
                    name="Artilheiros"
                    component={Artilheiros}
                />
            </Group>
        </Navigator>
    );
}