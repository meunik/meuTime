import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { setSeason } from '@/src/store/action';
import { torneio, torneioArtilheiros, getSeasons } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Lista } from "@/src/components/Lista";
import { Spinner } from "@/src/components/Spinner";

export function Tabela({params = null}) {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [artilheiros, setArtilheiros] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchDataTabela = async () => {
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        setTabela(await torneio(torneioId, season.id, true));
        setArtilheiros(await torneioArtilheiros(torneioId, season.id));
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
                <View style={styles.posicao(item, params && params.legenda)}>
                    <Text style={styles.txtPosicao(item, params && params.legenda)}>{item.position}</Text>
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

    function legenda() {
        return (
            <View style={styles.boxLegenda}>
                
                {params && params.legenda && (() => {
                    const items = [];
                    params.legenda.forEach((index, key) => items.push(
                        <Text key={key} style={styles.txtLegenda}>
                            {index.texto} <View style={styles.bolinha(index.hexa)}></View>
                        </Text>
                    ));
                    return items;
                })()}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.listaInfo}>
                    <View style={styles.linksContainer}>
                        {tabela && (artilheiros && artilheiros.length > 0) && <BaseButton onPress={() => navigation.navigate('Artilheiros', {
                            campeonatoNome: tabela.name,
                            campeonato: tabela.tournament,
                            torneioId: torneioId,
                            seasonId: season.id,
                            artilheiros: artilheiros,
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
                    {legenda()}
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
