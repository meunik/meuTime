import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
// import { JogoAtivo } from '@/src/components/Jogo';
import { JogoFuturo, JogoAtivo } from './JogoFuturo';

let nomeTimes = false;

export function Eliminatoria({item, nome, direcao = 'horizontal', scroll = true, nomeTime = false}) {
    nomeTimes = nomeTime;
    const hori = () => {
        if (scroll) {
            switch (direcao) {
                case 'ladoLado': return false;
                case 'vertical': return false;
                case 'horizontal': return true;
            
                default: return true;
            }
        } else {
            return false;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.txtX}>{nome}</Text>
            <ScrollView horizontal={hori()} style={{padding:0}}>
                {item && (() => {
                    switch (direcao) {
                        case 'ladoLado': return <MataMataLadoLado item={item}/>;
                        case 'vertical': return <MataMata item={item} vertical={true}/>;
                        case 'horizontal': return <MataMata item={item}/>;
                    
                        default: return <MataMata item={item}/>;
                    }
                })()}
            </ScrollView>
        </View>
    );
}

export const MataMata = ({item, vertical = false}) => {
    const cssPlayoffs = (vertical) ? styles.playoffsVertical : styles.playoffs;
    const cssJogos = (vertical) ? styles.jogosVertical : styles.jogos;

    return (
        <View style={cssPlayoffs}>
            
            {/* Oitavas de Final */}
            {item.left?.left?.left && <View style={cssJogos}>
                <ExibeJogo item={item.left.left.left} titulo="8ª de Final"/>
                <ExibeJogo item={item.left.left.right} titulo="8ª de Final"/>
                <ExibeJogo item={item.left.right.left} titulo="8ª de Final"/>
                <ExibeJogo item={item.left.right.right} titulo="8ª de Final"/>

                <ExibeJogo item={item.right.left.left} titulo="8ª de Final"/>
                <ExibeJogo item={item.right.left.right} titulo="8ª de Final"/>
                <ExibeJogo item={item.right.right.left} titulo="8ª de Final"/>
                <ExibeJogo item={item.right.right.right} titulo="8ª de Final"/>
            </View>}
            
            {/* Quartas de Final */}
            {item.left?.left && <View style={cssJogos}>
                <ExibeJogo item={item.left.left} titulo="4ª de Final"/>
                <ExibeJogo item={item.left.right} titulo="4ª de Final"/>
                <ExibeJogo item={item.right.left} titulo="4ª de Final"/>
                <ExibeJogo item={item.right.right} titulo="4ª de Final"/>
            </View>}

            {/* Semifinal */}
            {item.left && <View style={cssJogos}>
                <ExibeJogo item={item.left} titulo="Semifinal"/>
                <ExibeJogo item={item.right} titulo="Semifinal"/>
            </View>}

            {/* Final */}
            <View style={cssJogos}>
                <ExibeJogo item={item} final={true} titulo="Final"/>
            </View>
        </View>
    );
}

export const MataMataLadoLado = ({item}) => {
    return (
        <View>
            {/* Final */}
            <View style={styles.final}>
                <View style={styles.finalBorda}>
                    <ExibeJogo item={item} final={true} titulo="Final"/>
                </View>
            </View>
            <View style={styles.playoffsLadoLado}>
                
                {/* Oitavas de Final */}
                {item.left?.left?.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.left.left.left} titulo="8ª" vertical={true}/>
                    <ExibeJogo item={item.left.left.right} titulo="8ª" vertical={true}/>
                    <ExibeJogo item={item.left.right.left} titulo="8ª" vertical={true}/>
                    <ExibeJogo item={item.left.right.right} titulo="8ª" vertical={true}/>
                </View>}
                
                {/* Quartas de Final */}
                {item.left?.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.left.left} titulo="4ª" vertical={true}/>
                    <ExibeJogo item={item.left.right} titulo="4ª" vertical={true}/>
                </View>}

                {/* Semifinal */}
                {item.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.left} semiFinal={true} titulo="Semi" vertical={true}/>
                </View>}

                {/* Semifinal */}
                {item.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.right} semiFinal={true} titulo="Semi" vertical={true} direita={true}/>
                </View>}
                
                {/* Quartas de Final */}
                {item.left?.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.right.left} titulo="4ª" vertical={true} direita={true}/>
                    <ExibeJogo item={item.right.right} titulo="4ª" vertical={true} direita={true}/>
                </View>}
                
                {/* Oitavas de Final */}
                {item.left?.left?.left && <View style={styles.jogosLadoLado}>
                    <ExibeJogo item={item.right.left.left} titulo="8ª" vertical={true} direita={true}/>
                    <ExibeJogo item={item.right.left.right} titulo="8ª" vertical={true} direita={true}/>
                    <ExibeJogo item={item.right.right.left} titulo="8ª" vertical={true} direita={true}/>
                    <ExibeJogo item={item.right.right.right} titulo="8ª" vertical={true} direita={true}/>
                </View>}
            </View>
        </View>
    );
}

export function ExibeJogo ({
    item,
    final = false,
    semiFinal = false,
    titulo = null,
    vertical = false,
    direita = false, // false = esquerda
}) {
    let eventIds = null;
    if (item.eventIds) eventIds = item.eventIds;
    else if (item.events) eventIds = item.events;

    const eventos = () => {
        return (<View style={vertical ? styles.row(direita) : styles.rowFinal}>
            {eventIds && <Jogos
                id={eventIds[0]}
                vertical={vertical}
                final={final}
                direita={direita}
            />}
            {(eventIds && eventIds.length > 1) && <Jogos
                id={eventIds[1]}
                vertical={vertical}
                final={final}
                direita={direita}
            />}
        </View>)
    };
    const simulaEventos = () => {
        return (<View style={(final) || styles.row(direita)}>
            <JogoFuturo tamanhoImg={30} altura={vertical?null:40} vertical={vertical}/>
            {/* {(final) || <JogoFuturo tamanhoImg={30} altura={40} vertical={vertical}/>} */}
        </View>)
    };

    return (<View>
        <View style={styles.jogo}>
            {(item.leftParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoLeft}/>}
            {/* {!vertical && <Text style={styles.txtX}>{titulo}</Text>} */}
            <Text style={styles.txtX}>{titulo}</Text>
            {(item.rightParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoRight}/>}
        </View>
        <View>
            {(eventIds && eventIds.length > 0) ? eventos() : simulaEventos()}
        </View>
    </View>);
}

export function Jogos({id, vertical, final, direita}) {
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
                nomes={nomeTimes}
                titulo={false}
                tempo={false}
                tamanhoImg={30}
                altura={vertical?null:40}
                vertical={vertical}
                final={final}
                direita={direita}
            />}
        </>
    );
}
