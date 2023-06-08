import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { cariocao, cariocaoMataMata } from '@/src/store/store';
import { urlBase } from '@/src/store/api';
import { styles } from "./styles";
import { Lista } from "@/src/components/Lista";
import { Eliminatoria } from "./Eliminatoria/index";

export function Carioca() {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [mataMata, setMataMata] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDataTabela = async () => {
        setTabela(await cariocao());
        setMataMata(await cariocaoMataMata());
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDataTabela();
    };

    useEffect(() => {
        fetchDataTabela();
    }, []);

    function renderTabela(item, key) {
        return (
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
    }
    console.log(mataMata);
    // console.log(tabela);

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
            {mataMata && <Eliminatoria item={mataMata[0].views[0][0]} nome={mataMata[0].name}/>}
            {mataMata && <Eliminatoria item={mataMata[1].views[0][0]} nome={mataMata[1].name}/>}
            <View>
                <View style={styles.listaInfo}>
                    <View style={styles.linksContainer}>
                    </View>
                    <View>
                        <Text style={styles.txtLegenda}>Campeão da Taça Guanabara e Semifinalistas <View style={styles.bolinhaCampeao}></View></Text>
                        <Text style={styles.txtLegenda}>Semifinalistas <View style={styles.bolinhaSemifinalista}></View></Text>
                        <Text style={styles.txtLegenda}>Taça Rio <View style={styles.bolinhaTacaRio}></View></Text>
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
            <Lista data={tabela && tabela.rows} renderItem={renderTabela}/>
        </ScrollView>
    );
}
