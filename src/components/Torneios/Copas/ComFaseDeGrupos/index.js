import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { styles } from "./styles";
import { Lista } from "@/src/components/Lista";
import { Eliminatoria } from "./Eliminatoria/index";

export function Copa({
    copa,
    copaMataMata,
    renderTabela,
    buscaJogosAntes,
    buscaJogosDepois,
    buscaRodada,
    buscaTorneio,
    stringRodada,
    legenda = null,
    desabilitarGrupos = false,
    desabilitarMataMata = false,
    desabilitarBtnJogos = false,
    eliminatoriaVertical = 'horizontal',
}) {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [mataMata, setMataMata] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDataTabela = async () => {
        setTabela(await copa());
        setMataMata(await copaMataMata());
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        fetchDataTabela();
    }, []);

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
            {(
                !desabilitarBtnJogos &&
                buscaJogosAntes &&
                buscaJogosDepois &&
                buscaRodada &&
                tabela
            ) && <BaseButton onPress={() => navigation.navigate('TodosJogos', {
                buscaJogosAntes: buscaJogosAntes,
                buscaJogosDepois: buscaJogosDepois,
                buscaRodada: buscaRodada,
                stringRodada: stringRodada,
                buscaTorneio: buscaTorneio,
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
                    />
                ));
                return items;
            })()}
            
            {!desabilitarGrupos && tabela && (() => {
                const keys = Object.keys(tabela);
                const items = [];
                keys.forEach((key, index) => items.push(
                    <Tabelas key={index} tabela={tabela[key]} renderItem={renderTabela} legenda={legenda}/>
                ));
                return items;
            })()}
        </ScrollView>
    );
}

export function Tabelas({tabela, renderItem, legenda}) {
    return (
        <>
            <View style={styles.nomeTabela}>
                <Text style={styles.txtX}>{tabela.name}</Text>
            </View>
            <View>
                {legenda(tabela)}
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
