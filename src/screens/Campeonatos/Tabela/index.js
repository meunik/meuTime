import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from "react-native-gesture-handler";
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { setSeason } from '@/src/store/action';
import { torneio, torneioArtilheiros, torneioUltimosEventos, getSeasons } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Lista } from "@/src/components/Lista";
import { Spinner } from "@/src/components/Spinner";

export function Tabela({params = null}) {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [artilheiros, setArtilheiros] = useState(null);
    const [eventos, setEventos] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchDataTabela = async () => {
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        const table = await torneio(torneioId, season.id, true);
        setTabela(table);
        setArtilheiros(await torneioArtilheiros(torneioId, season.id));
        const ultimosEventos = await torneioUltimosEventos(torneioId, season.id);
        if (table?.tournament && ultimosEventos) setEventos(ultimosEventos[table.tournament.id]);

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

    const renderTabela = (item, key) => {
        const cincoEventos = [];
        /**
         * 1 = Vitória
         * 2 = Derrota
         * 3 = Empate
         */
        if (item?.team && eventos) {
            const timeEventos = eventos[item.team.id];
            timeEventos.forEach(evento => {
                if (evento.winnerCode == 1) {
                    if (evento.homeTeam.id == item.team.id) cincoEventos.push(1);
                    if (evento.awayTeam.id == item.team.id) cincoEventos.push(2);
                }
                if (evento.winnerCode == 2) {
                    if (evento.homeTeam.id == item.team.id) cincoEventos.push(2);
                    if (evento.awayTeam.id == item.team.id) cincoEventos.push(1);
                }
                if (evento.winnerCode == 3) cincoEventos.push(3);
            });
        }
        
        return (
        <View key={key} style={styles.lista}>
            <View style={styles.time}>
                <View style={styles.posicao(item, params && params.legenda)}>
                    <Text style={styles.txtPosicao(item, params && params.legenda)}>{item.position}</Text>
                </View>
                <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                <Text style={styles.txt}>{item.team.shortName}</Text>
            </View>
            <View style={styles.pontosDiv}>
                {!!cincoEventos.length && <View style={styles.pontos}>
                    <Text style={styles.bolinhaEvento(cincoEventos[0])}></Text>
                    <Text style={styles.bolinhaEvento(cincoEventos[1])}></Text>
                    <Text style={styles.bolinhaEvento(cincoEventos[2])}></Text>
                    <Text style={styles.bolinhaEvento(cincoEventos[3])}></Text>
                    <Text style={styles.bolinhaEvento(cincoEventos[4])}></Text>
                </View>}
                <View style={styles.pontos}>
                    <Text style={styles.txtPontos}>{item.points}</Text>
                    <Text style={styles.txtPontos}>{item.matches}</Text>
                    <Text style={styles.txtPontos}>{item.wins}</Text>
                    <Text style={styles.txtPontos}>{item.draws}</Text>
                    <Text style={styles.txtPontos}>{item.losses}</Text>
                    <Text style={{...styles.txtPontos, width: 20}}>{item.scoresFor - item.scoresAgainst}</Text>
                </View>
            </View>
        </View>
    )};

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
                    <View style={styles.pontosDiv}>
                        <View style={styles.pontos}>
                            <Text style={styles.bolinhaEvento(1)}></Text>
                            <Text style={styles.txtLegenda}>Vitória</Text>
                            <Text style={styles.txtLegenda}>|</Text>
                            <Text style={styles.bolinhaEvento(2)}></Text>
                            <Text style={styles.txtLegenda}>Derrota</Text>
                            <Text style={styles.txtLegenda}>|</Text>
                            <Text style={styles.bolinhaEvento(3)}></Text>
                            <Text style={styles.txtLegenda}>Empate</Text>
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
