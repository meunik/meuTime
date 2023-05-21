import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
import { brasileirao } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";

export function Tabela() {

	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDataTabela = async () => {
        setTabela(await brasileirao());
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        fetchDataTabela();
    }, []);

    const renderTabela = ({ item }) => (
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
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.info}>
                    {tabela && <Image style={styles.imgCampeonato} resizeMode="center" source={{ uri: `${urlBase}unique-tournament/${tabela.tournament.uniqueTournament.id}/image/dark` }} />}
                    <Text style={styles.txtInfo}>{tabela && tabela.name}</Text>
                </View>
                <View style={styles.listaInfo}>
                    {tabela && <BaseButton onPress={() => navigation.navigate('Artilheiros', {
                        campeonatoNome: tabela.name,
                        campeonato: tabela.tournament,
                    })} underlayColor>
                        <View style={styles.infoArtilheiros}>
                            <Text style={styles.txtLink}>Ver Artilheiros</Text>
                        </View>
                    </BaseButton>}
                    <View>
                        <Text style={styles.txtLegenda}>Libertadores <View style={styles.bolinhaLiberta}></View></Text>
                        <Text style={styles.txtLegenda}>Pré Libertadores <View style={styles.bolinhaPreLiberta}></View></Text>
                        <Text style={styles.txtLegenda}>Sulamericana <View style={styles.bolinhaSula}></View></Text>
                        <Text style={styles.txtLegenda}>Rebaixamento <View style={styles.bolinhaRebaixados}></View></Text>
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
                    </View>
                </View>
            </View>
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={tabela && tabela.rows}
                renderItem={renderTabela}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}
