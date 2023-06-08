
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { copaSulamericana } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import * as NavigationBar from 'expo-navigation-bar';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { theme } from "@/src/global/styles/theme";
import { styles } from "./styles";

export function Sulamericana() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

    const [refreshing, setRefreshing] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [index, setIndex] = useState(0);

    const fetchData = async () => {
        try {
            const sulamericana = await copaSulamericana();
            const formattedTabs = sulamericana.map((itens, index) => ({
                key: index,
                title: itens.name,
                content: itens.rows,
            }));
            setTabs(formattedTabs);
        } catch (error) {
            console.error(error);
        }
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

    const renderItem = ({item}) => (
        <View style={styles.lista}>
            <View style={styles.time}>
                <View style={styles.posicao(item)}>
                    <Text style={styles.txtPosicao(item)}>{item.position}</Text>
                </View>
                <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                <Text style={styles.txt}>{item.team.shortName}</Text>
            </View>
            <View style={styles.pontos}>
                <Text style={styles.txtPontos}>{item.points}</Text>
                <Text style={styles.txtPontos}>{item.matches}</Text>
                <Text style={styles.txtPontos}>{item.wins}</Text>
                <Text style={styles.txtPontos}>{item.draws}</Text>
                <Text style={styles.txtPontos}>{item.losses}</Text>
                <Text style={{...styles.txtPontos, width: 20}}>{item.scoresFor - item.scoresAgainst}</Text>
            </View>
        </View>
    );

    const Rodadas = ({jogos, rodada}) => {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.txtInfo}>{rodada}</Text>
                </View>
                <View>
                    <View style={styles.listaInfo}>
                        <View style={styles.linksContainer}></View>
                        <View>
                            <Text style={styles.txtLegenda}>Oitavas de Final <View style={styles.bolinhaOitavas}></View></Text>
                            <Text style={styles.txtLegenda}>Playoffs das Oitavas de Final <View style={styles.bolinhaPlayoffsOitavas}></View></Text>
                        </View>
                    </View>
                    <View style={styles.listaInfo}>
                        <View style={styles.time}>
                            <View>
                                <Text style={styles.txtInfo}>#</Text>
                            </View>
                            <Text style={styles.txtInfo}>Times</Text>
                        </View>
                        <View style={styles.pontos}>
                            <Text style={styles.txtInfoPontos}>P</Text>
                            <Text style={styles.txtInfoPontos}>J</Text>
                            <Text style={styles.txtInfoPontos}>V</Text>
                            <Text style={styles.txtInfoPontos}>E</Text>
                            <Text style={styles.txtInfoPontos}>D</Text>
                            <Text style={{...styles.txtInfoPontos, width: 20}}>SG</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={jogos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        )
    };

    const renderScene = SceneMap(
        Object.fromEntries(
            tabs.map((tab) => {
                return [
                    tab.key,
                    () => <Rodadas jogos={tab.content} rodada={tab.title} />,
                ]
            })
        )
    );

    const handleIndexChange = (newIndex) => {
        setIndex(newIndex);
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
            {tabs &&
            <TabView
                navigationState={{ index, routes: tabs }}
                renderScene={renderScene}
                // onIndexChange={handleIndexChange}
                onIndexChange={setIndex}
                renderTabBar={() => null}
            />}
        </View>
    );
}
