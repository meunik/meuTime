import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, ScrollView, TouchableOpacity, Linking, Dimensions, RefreshControl } from 'react-native';
import { urlBase } from '@/src/store/api';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import {
    proximoJogo,
    evento,
    getEscalacao,
    getTecnicos,
    getEstatisticas,
    getHighlights,
    getChannel,
} from '@/src/store/store';

import { setCarregarJogos, setIntervalo } from '@/src/store/action';
import { JogoAtivo } from "@/src/components/Jogo";
import { Lista } from "@/src/components/Lista";
import { Tabs } from "@/src/components/Tabs";

export function Partida() {
    useFocusEffect(() => {
        NavigationBar.setBackgroundColorAsync(theme.colors.fundo);

        return () => {
            NavigationBar.setBackgroundColorAsync(theme.colors.nav);
        };
    });

    const route = useRoute();
    const params = route.params;
    const idPartida = params ? params.idPartida : null;

    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const intervalo = useSelector(state => state.intervalo);
    const dispatch = useDispatch();

    const [jogo, setJogo] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [abas, setAbas] = useState(null);

    async function fetchData() {
        const jogoAgora = await evento(idPartida);
        const escalacao = await getEscalacao(idPartida);
        const tecnicos = await getTecnicos(idPartida);
        const estatisticas = await getEstatisticas(idPartida);
        const highlights = await getHighlights(idPartida);

        const estatisticasObj = {
            index: 0,
            tipo: 1,
            title: 'Estatísticas',
            content: estatisticas || null,
        };

        const escalacaoObj = {
            index: 1,
            tipo: 2,
            title: 'Escalação',
            content: (escalacao && tecnicos) ? {
                escalacao: escalacao,
                tecnicos: tecnicos,
            } : null,
        };

        const outrosObj = {
            index: 2,
            tipo: 3,
            title: 'Outros',
            content: (highlights && jogoAgora.venue && jogoAgora.referee) ? {
                jogoAgora: jogoAgora,
                highlights: highlights,
            } : null,
        };
        
        // console.log(jogoAgora);
        // console.log(escalacao);
        // console.log(tecnicos);
        // console.log(estatisticas);
        // console.log(highlights);

        setJogo(jogoAgora);
        setAbas([
            estatisticasObj,
            escalacaoObj,
            outrosObj,
        ]);

        if (jogoAgora.status.type == 'inprogress') {
            const interval = setInterval(async () => {
                const jogoAtualizado = await evento(jogoAgora.id);
                setJogo(jogoAtualizado);
                if (jogoAtualizado.status.type != 'inprogress') {
                    clearInterval(interval);
                }
            }, 1000);
            dispatch(setIntervalo(interval))
        }
        clearInterval(intervalo);

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };
    
    useEffect(() => {
        setRefreshing(true);
        fetchData();
        dispatch(setCarregarJogos(false))
    }, []);

    const renderAbas = (content, title, index, completo) => {
        switch (completo.tipo) {
            case 1: return <Estatistica estatistica={content}/>;
            // case 2: return <Escalacao escalacao={content.escalacao} tecnicos={content.tecnicos}/>;
            case 2: return <Escalacao content={content}/>;
            case 3: return <Outros content={content}/>;
        
            default:
                return (
                    <View style={{alignSelf: 'center'}}>
                        <Text style={styles.txtTitulo}>Teste</Text>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            <View>
                {jogo && <JogoAtivo jogo={jogo}/>}
            </View>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {abas && <Tabs data={abas} render={renderAbas} indexInicial={0} id='jogo'/>}
            </ScrollView>
        </View>
    );
}

export function Erro() {
    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={styles.txtEstatisticasNome}>Dados não encontrado.</Text>
        </View>
    );
}

export function Estatistica({estatistica}) {
    if (!estatistica) return <Erro />;

    const all = estatistica[0].groups;

    function renderItens(item, key) {
        let linha = false;
        let texto = 'txtEstatisticasNum';
        // if (txtMenor) texto = 'txtMenor';
        // if (txtMuitoMenor) texto = 'txtMuitoMenor';

        switch (item.name) {
            case "Ball possession": titulo = 'Posse de bola'; break;

            case "Total shots": titulo = 'Finalizações'; linha = true; break;
            case "Shots on target": titulo = 'Finalizações no gol'; break;
            case "Shots off target": titulo = 'Finalizações para fora'; break;
            // case "Blocked shots": titulo = 'Blocked shots'; break;

            case "Corner kicks": titulo = 'Escanteios'; linha = true; break;
            case "Offsides": titulo = 'Impedimentos'; break;
            case "Fouls": titulo = 'Faltas'; break;
            case "Yellow cards": titulo = 'Cartões amarelos'; break;
            // case "Free kicks": titulo = 'Free kicks'; break;
            case "Throw-ins": titulo = 'Lançamentos'; break;
            case "Goal kicks": titulo = 'Tiro de meta'; break;

            case "Big chances": titulo = 'Grandes chances de gol'; linha = true; break;
            case "Big chances missed": titulo = 'Grandes chances perdidas'; break;
            case "Hit woodwork": titulo = 'Contra-ataques'; break;
            case "Counter attacks": titulo = 'Chutes em contra-ataques'; break;
            case "Counter attack shots": titulo = 'Gols em contra-ataque'; break;
            case "Shots inside box": titulo = 'Finalizações de dentro da área'; break;
            case "Shots outside box": titulo = 'Finalizações de fora da área'; break;
            case "Goalkeeper saves": titulo = 'Defesas do goleiro'; break;
            // case "Goals prevented": titulo = 'Goals prevented'; break;

            case "Passes": titulo = 'Passes'; linha = true; break;
            case "Accurate passes": titulo = 'Passes certos'; texto = 'txtMenor'; break;
            case "Long balls": titulo = 'Bolas longas'; texto = 'txtMenor'; break;
            case "Crosses": titulo = 'Cruzamentos'; texto = 'txtMenor'; break;

            case "Dribbles": titulo = 'Dribles'; texto = 'txtMenor'; linha = true; break;
            case "Possession lost": titulo = 'Perda da posse de bola'; break;
            case "Duels won": titulo = 'Duelos ganhos'; break;
            case "Aerials won": titulo = 'Duelos aéreos ganhos'; break;

            case "Tackles": titulo = 'Desarmes'; linha = true; break;
            case "Interceptions": titulo = 'Interceptações'; break;
            case "Clearances": titulo = 'Cortes'; break;
        
            default: titulo = null; break;
        }

        return titulo && (<View key={key}>
            {linha && <View style={styles.linhaPH}></View>}
            <View style={styles.rowEstatistica}>
                <View style={styles.bolinhaNum}>
                    <Text style={styles[texto]}>{item.away}</Text>
                </View>
                <Text style={styles.txtEstatisticasNome}>{titulo}</Text>
                <View style={styles.bolinhaNum}>
                    <Text style={styles[texto]}>{item.home}</Text>
                </View>
            </View>
        </View>);
    }

    function renderAlls(item, key) {
        return (
            <View key={key}>
                <Lista
                    data={item.statisticsItems}
                    renderItem={renderItens}
                />
            </View>
        );
    }

    return (
        <View style={styles.tabsContainer}>
            <View style={styles.estatisticaContainer}>
                <Lista
                    data={all}
                    renderItem={renderAlls}
                />
            </View>
        </View>
    );
}

export function Escalacao({content}) {
    if (!content) return <Erro />;

    const escalacao = content.escalacao;
    const tecnicos = content.tecnicos;
    function renderEscalacao(item, key, info) {
        return (
            <View key={key} style={styles.lista}>
                <View style={styles.rowEscalacaoJogador}>
                    {info.esquerda && <Image style={styles.imgEscalacao} resizeMode="center" source={{ uri: `${urlBase}player/${item.player.id}/image` }} />}

                    <Text style={
                        (info.esquerda) ? styles.txtEscalacaoNomeEsquerda : styles.txtEscalacaoNomeDireita
                    }>{item.player.shortName}</Text>
                    
                    {(info.esquerda == false) && <Image style={styles.imgEscalacao} resizeMode="center" source={{ uri: `${urlBase}player/${item.player.id}/image` }} />}
                </View>
                {(key == 11) && <View style={styles.linha}></View>}
            </View>
        );
    }

    return (
        <View style={styles.tabsContainer}>
            <View style={styles.rowTecnicos}>
                <View style={styles.rowTecnico}>
                    <Image style={styles.imgEscalacao} resizeMode="center" source={{ uri: `${urlBase}manager/${tecnicos.homeManager.id}/image` }} />

                    <Text style={styles.txtTecnicosNomeEsquerda}>{tecnicos.homeManager.shortName}</Text>
                </View>
                <View style={styles.rowTecnico}>
                    <Text style={styles.txtTecnicosNomeDireita}>{tecnicos.awayManager.shortName}</Text>
                    
                    <Image style={styles.imgEscalacao} resizeMode="center" source={{ uri: `${urlBase}manager/${tecnicos.awayManager.id}/image` }} />
                </View>
            </View>
            <View style={styles.rowEscalacao}>
                <View style={styles.flexUm}>
                    <Lista
                        data={escalacao.home.players}
                        renderItem={renderEscalacao}
                        infoAdd={{esquerda: true}}
                    />
                </View>
                <View style={styles.flexUm}>
                    <Lista
                        data={escalacao.away.players}
                        renderItem={renderEscalacao}
                        infoAdd={{esquerda: false}}
                    />
                </View>
            </View>
        </View>
    );
}

export function Outros({content}) {
    if (!content) return <Erro />;

    // const screenWidth = Dimensions.get('window').width;
    // const screenHeight = Dimensions.get('window').height;
    const venue = content.jogoAgora.venue;

    const Linha = ({item, titulo, txtMenor = false, txtMuitoMenor = false, pais = false}) => {
        let texto = 'txtEstatisticasNum';
        if (txtMenor) texto = 'txtMenor';
        if (txtMuitoMenor) texto = 'txtMuitoMenor';

        return (
            <View style={styles.rowInfos}>
                <Text style={styles.txtEstatisticasNome}>{titulo}</Text>
                <View style={styles.rowEnd}>
                    <Text style={styles[texto]}>{item}</Text>
                    {pais && <Image style={styles.imgBandeira} resizeMode="center" source={{ uri: `https://www.sofascore.com/static/images/flags/${pais}.png` }}/>}
                </View>
            </View>
        );
    };

    function renderHighlights(item, key) {
        return (
            <View key={key} style={styles.lista}>
                <TouchableOpacity onPress={() => Linking.openURL(item.sourceUrl)}>
                    <View style={styles.rowHighlights}>
                        <View style={styles.imgHighlightsBox}>
                            <Image style={styles.imgHighlights} resizeMode="center" source={{ uri: item.thumbnailUrl }}/>
                            <Icon style={styles.play} name="play-circle-outline" size={30} color="#ffffff"/>
                        </View>

                        <View style={styles.pyHighlights}>
                            <Text style={styles.txtHighlights}>{item.title}</Text>
                            <Text style={styles.txtSubtitle}>{item.subtitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.linhaPH}></View>
            </View>
        );
    }

    return (
        <View style={styles.tabsContainer}>
            <View style={styles.estatisticaContainer}>
                {content.highlights && <View style={styles.flexUm}>
                    <Text style={styles.txtTitulo}>Highlights</Text>
                    <Lista
                        data={content.highlights}
                        renderItem={renderHighlights}
                    />
                </View>}
                {content.jogoAgora.referee && <View style={styles.infoBox}>
                    <Text style={styles.txtTitulo}>Árbitro</Text>
                    <Linha item={content.jogoAgora.referee.name} titulo='Nome'/>
                </View>}
                {venue && <View style={styles.infoBox}>
                    <Text style={styles.txtTitulo}>Estádio </Text>
                    <Linha item={venue.stadium.name} titulo='Nome' txtMuitoMenor={true}/>
                    <Linha item={venue.stadium.capacity} titulo='Capacidade'/>
                    <Linha
                        item={`${venue.city.name} / ${venue.country.alpha2}`}
                        titulo='Local'
                        txtMenor={true}
                        pais={venue.country.alpha2.toLowerCase()}
                    />
                </View>}
            </View>
        </View>
    );
}