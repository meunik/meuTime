import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { urlBase } from '@/src/store/api';
import { setSeason } from '@/src/store/action';
import { torneio, torneioMataMata, getSeasons } from '@/src/store/store';
import { limitarString } from "@/src/Utils/LimitarString";
import { Lista } from "@/src/components/Lista";
import { styles } from "./styles";
import { Eliminatoria } from "./Eliminatoria/index";
import { seasons } from '@/src/store/api';
import { listaTorneios } from "@/src/store/listaTorneios";
import { Spinner } from "@/src/components/Spinner";

export function Copa({
    campeaoGrupos = false,
    mataMataString = 0,
    limitaString = 14,
    legenda = null,
    desabilitarGrupos = false,
    desabilitarMataMata = false,
    desabilitarBtnJogos = false,
    eliminatoriaVertical = 'horizontal',
    scroll = true,
}) {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [mataMata, setMataMata] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const torneioId = useSelector(state => state.torneioId);
    const season = useSelector(state => state.season);
    const dispatch = useDispatch();

    const fetchDataTabela = async (refresh = false) => {
        if (!refresh) {
            setTabela(null);
            setMataMata(null);
        }
        let season = await getSeasons(torneioId);
        dispatch(setSeason(season));

        setTabela(await torneio(torneioId, season.id));
        setMataMata(await torneioMataMata(torneioId, season.id));
        // console.log(tabela);
        // console.log(mataMata);
        // console.log(desabilitarMataMata);

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
                    />
                ));
                return items;
            })() : <Spinner /> )}
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
