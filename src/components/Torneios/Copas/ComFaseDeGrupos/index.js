import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, RefreshControl, FlatList } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { urlBase } from '@/src/store/api';
import { setSeason } from '@/src/store/action';
import {
    torneio,
    torneioMataMata,
    torneioArtilheiros,
    getSeasons,
    torneioJogosDepois,
    torneioJogosAntes,
    torneioRodada
} from '@/src/store/store';
import { limitarString } from "@/src/Utils/LimitarString";
import { Lista } from "@/src/components/Lista";
import { styles } from "./styles";
import { Eliminatoria } from "@/src/components/Torneios/Eliminatoria";
import { listaTorneios } from "@/src/store/listaTorneios";
import { Spinner } from "@/src/components/Spinner";
import { JogoAtivo } from "@/src/components/Jogo";

export function Copa({params = null}) {
	const campeaoGrupos = (params && params.campeaoGrupos) ? params.campeaoGrupos : false;
	const mataMataString = (params && params.mataMataString) ? params.mataMataString : 0;
	const limitaString = (params && params.limitaString) ? params.limitaString : 14;
	const legenda = (params && params.legenda) ? params.legenda : null;
	const desabilitarGrupos = (params && params.desabilitarGrupos) ? params.desabilitarGrupos : false;
	const desabilitarMataMata = (params && params.desabilitarMataMata) ? params.desabilitarMataMata : false;
	const desabilitarBtnJogos = (params && params.desabilitarBtnJogos) ? params.desabilitarBtnJogos : false;
	const eliminatoriaVertical = (params && params.eliminatoriaVertical) ? params.eliminatoriaVertical : 'horizontal';
	const scroll = (params && params.scroll) ? params.scroll : true;

	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [mataMata, setMataMata] = useState(null);
    const [artilheiros, setArtilheiros] = useState(null);
    const [jogosRodada, setJogosRodada] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchDataTabela = async (refresh = false) => {
        if (!refresh) {
            setTabela(null);
            setMataMata(null);
            setArtilheiros(null);
        }
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        setTabela(await torneio(torneioId, season.id));
        setMataMata(await torneioMataMata(torneioId, season.id));
        setArtilheiros(await torneioArtilheiros(torneioId, season.id));
        
        const jogosDepois = await torneioJogosDepois(torneioId, season.id);
        const jogosAntes = await torneioJogosAntes(torneioId, season.id);
        const rodada = await torneioRodada(torneioId, season.id);
        let depois = jogosDepois ? jogosDepois?.events : [];
        let antes = jogosAntes ? jogosAntes?.events : [];
        round = rodada?.round;
        depois = depois.filter(item => item.roundInfo.round == round);
        antes = antes.filter(item => item.roundInfo.round == round);
        setJogosRodada([...antes, ...depois]);

        setCarregando(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela(true);
    };

    useEffect(() => {
        setCarregando(true);
        fetchDataTabela();
    }, [torneioId]);

    function renderTabela(item, key) {
        return (
            <View key={key} style={styles.lista}>
                <View style={styles.time}>
                    <View style={styles.posicao(item, campeaoGrupos)}>
                        <Text style={styles.txtPosicao(item)}>{item.position}</Text>
                    </View>
                    <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.team.id}/image` }} />
                    <Text style={styles.txt}>{limitarString(item.team.shortName, limitaString)}</Text>
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
    }

    const renderJogos = ({ item, index }) => (
        <BaseButton onPress={() => navigation.navigate('Partida', { idPartida: item.id })}>
            <JogoAtivo jogo={item} campeonato={true} tamanhoImg={30} altura={117} />
        </BaseButton>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {(!desabilitarBtnJogos && tabela) && <BaseButton onPress={() => navigation.navigate('TodosJogos', {
                mataMataString: mataMataString,
            })}>
                <View style={styles.btn}>
                    <Text style={styles.txtLink}>Jogos</Text>
                </View>
            </BaseButton>}
            {tabela && (artilheiros && artilheiros.length > 0) && <BaseButton onPress={() => navigation.navigate('Artilheiros', {
                campeonatoNome: tabela.name,
                campeonato: tabela,
                torneioId: torneioId,
                seasonId: season.id,
                artilheiros: artilheiros,
            })}>
                <View style={styles.btn}>
                    <Text style={styles.txtLink}>Artilheiros</Text>
                </View>
            </BaseButton>}

            {!desabilitarMataMata && mataMata && (() => {
                const keys = Object.keys(mataMata);
                const items = [];
                keys.forEach((key, index) => items.push(
                    <Eliminatoria
                        key={index}
                        item={mataMata[key].views[0][0]}
                        nome={mataMata[key].name}
                        direcao={eliminatoriaVertical}
                        scroll={scroll}
                    />
                ));
                return items;
            })()}
            
            {!desabilitarGrupos && ( (tabela && !carregando) ? (() => {
                const keys = Object.keys(tabela);
                const items = [];
                keys.forEach((key, index) => items.push(
                    <Tabelas
                        key={index}
                        tabela={tabela[key]}
                        renderItem={renderTabela}
                        legenda={legenda}
                        torneioId={torneioId}
                        jogosRodada={jogosRodada}
                    />
                ));
                return items;
            })() : <Spinner /> )}

            {jogosRodada && (
                <>
                    <View style={styles.jogosRodada}>
                        <Text style={styles.txtTitulo}>Jogos da Rodada</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={jogosRodada}
                        renderItem={renderJogos}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </>
            )}
        </ScrollView>
    );
}

export function Tabelas({tabela, renderItem, torneioId}) {
    const legendaFiltrada = () => {
        filtrado = listaTorneios.filter(item => item.id == torneioId);
        return (filtrado[0]) ? filtrado[0].legenda : null;
    }

    function legenda() {
        return (
            <View style={styles.listaInfo}>
                <View style={styles.linksContainer}>
                </View>
                <View>
                    {tabela && torneioId && (() => {
                        const legendas = legendaFiltrada();
                        const items = [];
                        legendas.forEach((index, key) => items.push(
                            <View key={key} style={styles.boxLegenda}>
                                <Text style={styles.txtLegenda}>{index.texto}</Text>
                                <View style={styles[index.cor]}></View>
                            </View>
                        ));
                        return items;
                    })()}
                </View>
            </View>
        );
    }

    return (
        <>
            <View style={styles.nomeTabela}>
                <Text style={styles.txtX}>{tabela.name}</Text>
            </View>
            <View>
                {legendaFiltrada() && legenda(tabela)}
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
            <Lista data={tabela && tabela.rows} renderItem={renderItem}/>
        </>
    );
}
