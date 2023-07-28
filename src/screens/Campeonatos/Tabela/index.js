import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { setSeason } from '@/src/store/action';
import { torneio, getSeasons } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Lista } from "@/src/components/Lista";
import { Spinner } from "@/src/components/Spinner";

export function Tabela() {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchDataTabela = async () => {
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        setTabela(await torneio(torneioId, season.id, true));
        setCarregando(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        fetchDataTabela();
    }, []);

    const renderTabela = (item, key) => (
        <View key={key} style={styles.lista}>
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

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.listaInfo}>
                    <View style={styles.linksContainer}>
                        {tabela && <BaseButton onPress={() => navigation.navigate('BrasileiraoArtilheiros', {
                            campeonatoNome: tabela.name,
                            campeonato: tabela.tournament,
                        })}>
                            <View style={styles.btn}>
                                <Text style={styles.txtLink}>Ver Artilheiros</Text>
                            </View>
                        </BaseButton>}
                        {tabela && <BaseButton onPress={() => navigation.navigate('TodosJogos')}>
                            <View style={styles.btn}>
                                <Text style={styles.txtLink}>Jogos</Text>
                            </View>
                        </BaseButton>}
                    </View>
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
                        <Text style={{...styles.txtInfoPontos, width: 20}}>SG</Text>
                    </View>
                </View>
            </View>
            {(tabela && !carregando) ? <Lista
                scroll={true}
                contentContainerStyle={styles.contentContainerStyle}
                data={tabela.rows}
                renderItem={renderTabela}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> : <Spinner />}
        </View>
    );
}
