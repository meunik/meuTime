import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { urlBase } from '@/src/store/api';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icone from 'react-native-vector-icons/FontAwesome';
import * as NavigationBar from 'expo-navigation-bar';
import { styles } from "./styles";
import { theme } from "@/src/global/styles/theme";
import {
    proximoJogo,
    evento,
    getEscalacao,
    getTecnicos,
    getEstatisticas,
    getIncidents,
    getHighlights,
    getChannel,
} from '@/src/store/store';

import { setCarregarJogos, setIntervalo } from '@/src/store/action';
import { JogoAtivo } from "@/src/components/Jogo";
import { Lista } from "@/src/components/Lista";
import { Tabs } from "@/src/components/Tabs";
import { Spinner } from "@/src/components/Spinner";
import { limitarString } from "@/src/Utils/LimitarString";

export function Partida() {
    const route = useRoute();
    const params = route.params;
    const idPartida = params ? params.idPartida : null;

	const navigation = useNavigation();
    const meuTime = useSelector(state => state.meuTime);
    const carregarJogos = useSelector(state => state.carregarJogos);
    const intervalo = useSelector(state => state.intervalo);
    const dispatch = useDispatch();

    const [jogo, setJogo] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [abas, setAbas] = useState(null);
    const [intervaloLocal, setIntervaloLocal] = useState(null);

    async function fetchData() {
        const jogoAgora = await evento(idPartida);
        const escalacao = await getEscalacao(idPartida);
        const tecnicos = await getTecnicos(idPartida);
        const estatisticas = await getEstatisticas(idPartida);
        const incidents = await getIncidents(idPartida);
        const highlights = await getHighlights(idPartida);

        let incidentsPlayers = {};
        if (incidents) {
            incidents.forEach(incident => {
                if (incident.incidentType == 'substitution') {
                    if (incident.playerIn) {
                        if (incidentsPlayers[incident.playerIn.id]) {
                            incidentsPlayers[incident.playerIn.id].entrou = true;
                            incidentsPlayers[incident.playerIn.id].por = incident.playerOut.shortName;
                        } else {
                            incidentsPlayers[incident.playerIn.id] = {
                                entrou: true,
                                por: incident.playerOut.shortName
                            };
                        }
                    }
                    if (incident.playerOut) {
                        if (incidentsPlayers[incident.playerOut.id]) {
                            incidentsPlayers[incident.playerOut.id].saiu = true;
                            incidentsPlayers[incident.playerOut.id].por = incident.playerIn.shortName;
                        } else {
                            incidentsPlayers[incident.playerOut.id] = {
                                saiu: true,
                                por: incident.playerIn.shortName
                            };
                        }
                    }
                }

                if (incident.player) {
                    let player = incidentsPlayers[incident.player.id]??{};

                    if ((incident.incidentType == 'card') && (incident.player)) {
                        if (incident.incidentClass == 'yellow')
                            player.cartaoAmarelo = player.cartaoAmarelo ? player.cartaoAmarelo+1 : 1;

                        if (incident.incidentClass == 'red')
                            player.cartaoVermelho = player.cartaoVermelho ? player.cartaoVermelho+1 : 1;

                        if (incident.incidentClass == 'yellowRed') {
                            player.cartaoAmarelo = player.cartaoAmarelo ? player.cartaoAmarelo+1 : 1;
                            player.cartaoVermelho = player.cartaoVermelho ? player.cartaoVermelho+1 : 1;
                        }
                    }

                    if ((incident.incidentType == 'goal') && incident.player)
                        player.gol = player.gol ? player.gol+1 : 1;

                    incidentsPlayers[incident.player.id] = {
                        ...incidentsPlayers[incident.player.id],
                        ...player
                    };
                }
            });
        }

        if (escalacao) {
            let fora = escalacao.away.players
            let casa = escalacao.home.players
            fora.sort((a, b) => a.substitute - b.substitute);
            fora = fora.map(obj => {
                return (incidentsPlayers[obj.player.id]) ? { ...obj, ...incidentsPlayers[obj.player.id] } : obj;
            });
            casa.sort((a, b) => a.substitute - b.substitute);
            casa = casa.map(obj => {
                return (incidentsPlayers[obj.player.id]) ? { ...obj, ...incidentsPlayers[obj.player.id] } : obj;
            });
            escalacao.away.players = fora;
            escalacao.home.players = casa;
        }

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
            content: (highlights || jogoAgora.venue || jogoAgora.referee) ? {
                jogoAgora: jogoAgora,
                highlights: highlights,
            } : null,
        };

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
        dispatch(setCarregarJogos(false));
        return () => {
            if (intervaloLocal) clearInterval(intervaloLocal);
        };
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

    return jogo ? (
        <View style={styles.container}>
            <BaseButton onPress={() => navigation.goBack()}>
                <Icon name="arrow-u-left-top" size={30} color="#434343" style={styles.voltar} />
            </BaseButton>
            <View>
                {jogo && <JogoAtivo jogo={jogo} bordas={false} altura={117} />}
            </View>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {abas && <Tabs data={abas} render={renderAbas} indexInicial={0} id='jogo'/>}
            </ScrollView>
        </View>
    ): <Spinner fundoPreto />;
}

export function Erro() {
    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={styles.txtEstatisticasNome}>Dados não encontrado.</Text>
        </View>
    );
}

export function Estatistica({estatistica}) {
    const [passesHome, setPassesHome] = useState(null);
    const [passesAway, setPassesAway] = useState(null);

    const [passesHomePorcent, setPassesHomePorcent] = useState(null);
    const [passesAwayPorcent, setPassesAwayPorcent] = useState(null);
    
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

            // case "Expected goals": titulo = 'Expectativas de Gols'; break;

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
            case "Duels": titulo = 'Duelos'; texto = 'txtMenor'; break;
            // case "Recoveries": titulo = 'Recuperações'; texto = 'txtMenor'; linha = true; break;

            case "Dribbles": titulo = 'Dribles'; texto = 'txtMenor'; linha = true; break;
            case "Possession lost": titulo = 'Perda da posse de bola'; break;
            case "Duels won": titulo = 'Duelos ganhos'; break;
            case "Aerials won": titulo = 'Duelos aéreos ganhos'; break;

            case "Tackles": titulo = 'Desarmes'; linha = true; break;
            case "Interceptions": titulo = 'Interceptações'; break;
            case "Clearances": titulo = 'Cortes'; break;
        
            default: titulo = null; break;
        }

        if (item.name == 'Passes') {
            if (item.home) setPassesHome(item.home);
            if (item.away) setPassesAway(item.away);
        }

        if (item.name == 'Accurate passes') {
            setPassesHomePorcent(Math.floor((item.home / passesHome) * 100))
            setPassesAwayPorcent(Math.floor((item.away / passesAway) * 100))
        }

        return titulo && (<View key={key}>
            {linha && <View style={styles.linhaPH}></View>}
            <View style={styles.rowEstatistica}>
                <View style={styles.bolinhaNum}>
                    <Text style={styles[texto]}>
                        {item.home}
                        {(passesHomePorcent && (item.name == 'Accurate passes')) && ` (${passesHomePorcent}%)`}
                    </Text>
                </View>
                <Text style={styles.txtEstatisticasNome}>{titulo}</Text>
                <View style={styles.bolinhaNum}>
                    <Text style={styles[texto]}>
                        {item.away}
                        {(passesAwayPorcent && (item.name == 'Accurate passes')) && ` (${passesAwayPorcent}%)`}
                    </Text>
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

                    <View style={{
                        ...styles.divEscalacaoNome, 
                        alignItems: (info.esquerda) ? 'flex-end' : 'flex-start'
                    }}>
                        <Text style={{
                            ...styles.txtEscalacaoNome, 
                            textAlign: (info.esquerda) ? 'left' : 'right'
                        }}>{limitarString(item.player.shortName, 16)}</Text>
                        <View style={{
                            ...styles.divInfoEscalacao, 
                            textAlign: (info.esquerda) ? 'left' : 'right',
                            justifyContent: (info.esquerda) ? 'flex-start' : 'flex-end',
                            flexDirection: (info.esquerda) ? 'row' : 'row-reverse',
                        }}>
                            {item.por && <Text style={{
                                ...styles.infoEscalacaoNome, 
                                textAlign: (info.esquerda) ? 'left' : 'right'
                            }}>
                                ({!info.esquerda && <Icon name="swap-horizontal-bold" size={10} color="#fff" style={styles.gol}/>}
                                {limitarString(item.por, (item.statistics?.goals)?13-(item.statistics.goals*2):13)}
                                {info.esquerda && <Icon name="swap-horizontal-bold" size={10} color="#fff" style={styles.gol}/>})
                            </Text>}

                            {item.statistics?.ownGoals ? Array.from({ length: item.statistics.ownGoals ?? 0 }, (_, i) => (
                                <Icone key={i} name="soccer-ball-o" size={10} color="#e35c47" style={styles.gol}/>
                            )) : null}

                            {item.statistics?.goals ? Array.from({ length: item.statistics.goals ?? 0 }, (_, i) => (
                                <Icone key={i} name="soccer-ball-o" size={10} color="#fff" style={styles.gol}/>
                            )) : null}

                            {(item.cartaoAmarelo || item.cartaoVermelho) && <View style={styles.cartaoDiv}>
                                {item.cartaoAmarelo ? Array.from({ length: item.cartaoAmarelo ?? 0 }, (_, i) => (
                                    <Icon key={'homeRedCards'+i} name="card" size={10} color="#d9af00" style={styles.cartao} />
                                )) : null}
                                {item.cartaoVermelho ? Array.from({ length: item.cartaoVermelho ?? 0 }, (_, i) => (
                                    <Icon key={'homeRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartao} />
                                )) : null}
                            </View>}

                            <Text style={{
                                ...styles.infoEscalacaoNome, 
                                textAlign: (info.esquerda) ? 'left' : 'right'
                            }}>({item.shirtNumber})</Text>
                        </View>
                    </View>

                    {(info.esquerda == false) && <Image style={styles.imgEscalacao} resizeMode="center" source={{ uri: `${urlBase}player/${item.player.id}/image` }} />}
                </View>
                {(key == 10) && <View style={styles.linha}></View>}
            </View>
        );
    }

    return (
        <View style={styles.tabsContainer}>
            <View style={styles.rowTecnicos}>
                <View style={styles.rowTecnico}>
                    <Text style={styles.infoEsquerda}>{escalacao.home.formation}</Text>
                </View>
                <View style={styles.rowTecnico}>
                    <Text style={styles.infoDireita}>{escalacao.away.formation}</Text>
                </View>
            </View>
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