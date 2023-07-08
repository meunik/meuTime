import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
import { JogoAtivo } from '@/src/components/Jogo';
import { JogoFuturo } from './JogoFuturo';

export function Eliminatoria({item, nome, direcao = 'horizontal', scroll = true}) {
    const hori = () => {
        if (scroll) {
            switch (direcao) {
                case 'verticalLadoLado': return false;
                case 'horizontalLadoLado': return true;
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
                        case 'verticalLadoLado': return <MataMataLadoLado item={item} vertical={true}/>;
                        case 'horizontalLadoLado': return <MataMataLadoLado item={item}/>;
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

export const MataMataLadoLado = ({item, vertical = false}) => {
    const cssPlayoffs = (vertical) ? styles.playoffsVertical : styles.playoffsLadoLado;
    const cssJogos = (vertical) ? styles.jogosVertical : styles.jogosLadoLado;

    return (
        <View style={cssPlayoffs}>
            
            {/* Oitavas de Final */}
            {/* {item.left?.left?.left && <View style={cssJogos}>
            <ExibeJogo item={item.left.left.left} titulo="8ª de Final"/>
            <ExibeJogo item={item.left.left.right} titulo="8ª de Final"/>
            <ExibeJogo item={item.left.right.left} titulo="8ª de Final"/>
            <ExibeJogo item={item.left.right.right} titulo="8ª de Final"/>
            </View>} */}
            
            {/* Quartas de Final */}
            {item.left?.left && <View style={cssJogos}>
                <ExibeJogo item={item.left.left} titulo="4ª de Final"/>
                <ExibeJogo item={item.left.right} titulo="4ª de Final"/>
            </View>}

            {/* Semifinal */}
            {item.left && <View style={cssJogos}>
                <ExibeJogo item={item.left} titulo="Semifinal"/>
            </View>}

            {/* Final */}
            <View style={styles.final}>
                <ExibeJogo item={item} final={true} titulo="Final"/>
            </View>

            {/* Semifinal */}
            {item.left && <View style={cssJogos}>
                <ExibeJogo item={item.right} titulo="Semifinal"/>
            </View>}
            
            {/* Quartas de Final */}
            {item.left?.left && <View style={cssJogos}>
                <ExibeJogo item={item.right.left} titulo="4ª de Final"/>
                <ExibeJogo item={item.right.right} titulo="4ª de Final"/>
            </View>}
            
            {/* Oitavas de Final */}
            {/* {item.left?.left?.left && <View style={cssJogos}>
            <ExibeJogo item={item.right.left.left} titulo="8ª de Final"/>
            <ExibeJogo item={item.right.left.right} titulo="8ª de Final"/>
            <ExibeJogo item={item.right.right.left} titulo="8ª de Final"/>
            <ExibeJogo item={item.right.right.right} titulo="8ª de Final"/>
            </View>} */}
        </View>
    );
}

export function ExibeJogo ({item, final = false, titulo = null}) {
    const eventos = () => {
        return (<View style={styles.row}>
            {item.eventIds && <Jogos id={item.eventIds[0]}/>}
            {(item.eventIds.length > 1) && <Jogos id={item.eventIds[1]}/>}
        </View>)
    };
    const simulaEventos = () => {
        return (<>
            <JogoFuturo tamanhoImg={30} altura={40}/>
        </>)
    };

    return (<View>
        <View style={styles.jogo}>
            {(item.leftParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoLeft}/>}
            <Text style={styles.txtX}>{titulo}</Text>
            {(item.rightParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoRight}/>}
        </View>
        <View>
            {(item.eventIds.length > 0) ? eventos() : simulaEventos()}
        </View>
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
