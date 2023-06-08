import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { urlBase } from '@/src/store/api';
import { copaDoBrasil, copaDoBrasilJogos } from '@/src/store/store';
// import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
import { JogoAtivo } from '@/src/components/Jogo';

import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export function CopaDoBrasil() {
	const navigation = useNavigation();
    const [tabela, setTabela] = useState(null);
    const [mataMata, setMataMata] = useState(null);
    const [mataMataJogos, setMataMataJogos] = useState(null);
    const [mataMataEsquerda, setMataMataEsquerda] = useState(null);
    const [mataMataDireita, setMataMataDireita] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDataTabela = async () => {
        setMataMata(await copaDoBrasil());
        setMataMataJogos(await copaDoBrasilJogos());

        let mataEsquerda = JSON.parse(JSON.stringify(mataMataJogos));
        let mataDireita = JSON.parse(JSON.stringify(mataMataJogos));

        const currentRoundEsquerda = mataEsquerda[0].currentRound;
        mataEsquerda[0].rounds = mataEsquerda[0].rounds.filter((e, i) => (i < currentRoundEsquerda));
        mataEsquerda[0].rounds.forEach(rodada => {
            const metade = rodada.blocks.length/2;
            rodada.blocks = rodada.blocks.filter((e, i) => (i < metade));
        });
        setMataMataEsquerda(mataEsquerda);

        const currentRoundDireita = mataDireita[0].currentRound;
        mataDireita[0].rounds = mataDireita[0].rounds.filter((e, i) => (i < currentRoundDireita));
        mataDireita[0].rounds.forEach(rodada => {
            const metade = rodada.blocks.length/2;
            rodada.blocks = rodada.blocks.filter((e, i) => !(i < metade));
        });
        setMataMataDireita(mataDireita);

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
        <ScrollView>
        <ScrollView
            horizontal={true}
            contentContainerStyle={styles.contentContainerStyle}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />
            // }
        >
            <View style={styles.row}>
                {mataMataJogos && (() => {
                    let rounds = mataMataJogos[0].rounds;
                    let currentRound = mataMataJogos[0].currentRound;
                    const items = [];
                    for (let i = 0; i < currentRound; i++) {
                        items.push( <Eliminatoria key={`eliminatoria${i}`} item={rounds[i]}/> );
                    }
                    return items;
                })()}
            </View>
        </ScrollView>
        </ScrollView>
    );
}

export function Eliminatoria({item}) {
    const jogos = item.blocks;

    return (
        <View style={styles.container}>
            <Text style={styles.txtRodada}>{item.description}</Text>
            <View style={styles.playoffs}>
                
                {jogos && (() => {
                    const items = [];
                    for (let i = 0; i < jogos.length; i++) {
                        if (jogos[i].participants.length == 2) {
                            items.push( <ExibeJogo key={`exibeJogo${i}`} item={jogos[i]}/> );
                        }
                    }
                    return items;
                })()}
            </View>
        </View>
    );
}

export function ExibeJogo ({item, final = false}) {
    return (<View>
        <View style={styles.jogo}>
            <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.participants[0]?.team?.id}/image` }} />
            <Text style={styles.txtX}>{item.homeTeamScore}</Text>
            <Text style={styles.txtX}>x</Text>
            <Text style={styles.txtX}>{item.awayTeamScore}</Text>
            <Image style={styles.imgTime} resizeMode="center" source={{ uri: `${urlBase}team/${item.participants[1]?.team?.id}/image` }} />
        </View>
        {/* <View>
            {item.eventIds.length > 0 && <Jogos id={item.eventIds[0]}/>}
            {(item.eventIds.length > 1) && <Jogos id={item.eventIds[1]}/>}
        </View> */}
    </View>);
}

export function Jogos({id}) {
    const [jogo, setJogo] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            const jogoAgora = await evento(id);
            setJogo(jogoAgora);
        };

        fetchData();
    }, [id]);

    return (
        <>
            {jogo && 
            <JogoAtivo
                jogo={jogo}
                nomes={false}
                titulo={false}
                tempo={false}
                tamanhoImg={30}
                altura={40}
            />}
        </>
    );
}

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 10,
    },
    contentContainerStyle: {
        paddingBottom: theme.contentContainerStyle.paddingBottom,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    playoffs: {
        // justifyContent: 'space-around',
        paddingVertical: 20,
        height: '100%',
        bottom: 1,
        gap: 10,
    },
    imgTime: {
        height: 30,
        width: 30,
    },
    jogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: '#33333330',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff20',
        padding: 10,
    },
    semiFinal: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    txtRodada: {
        color: theme.colors.texto[300],
        textAlign: 'center',
    },
    txtX: {
        color: theme.colors.texto[300],
    },
    txtTime: {
        color: theme.colors.texto[100],
        fontSize: theme.font.size[6],
    },
    campeaoLeft: {
        position: 'absolute',
        paddingRight: 140,
    },
    campeaoRight: {
        position: 'absolute',
        paddingLeft: 140,
    },
})