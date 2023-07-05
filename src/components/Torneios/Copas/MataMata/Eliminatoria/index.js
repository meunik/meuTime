import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
// import { JogoAtivo } from '@/src/components/Jogo';
import { JogoFuturo, JogoAtivo } from './JogoFuturo';

let nomeTimes = false;

export function Eliminatoria({item, nome, nomeTime = false}) {
    nomeTimes = nomeTime;
    return (
        <View style={styles.container}>
            <Text style={styles.txtX}>{nome}</Text>
            <ScrollView style={{padding: 0, width: '100%'}}>
                <MataMata item={item} nomeTime={nomeTime}/>
            </ScrollView>
        </View>
    );
}

export const MataMata = ({item}) => {
    return (
        <View style={styles.playoffs}>
            
            {/* Oitavas de Final */}
            {item[3] && <View style={styles.jogos}>
                <ExibeJogo item={item[3][0]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][1]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][2]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][3]} titulo="Oitavas de Final"/>
            </View>}
            
            {/* Quartas de Final */}
            {item[0][0].left?.left && <View style={styles.jogos}>
                <ExibeJogo item={item[0][0].left.left} titulo="Quartas de Final"/>
                <ExibeJogo item={item[0][0].left.right} titulo="Quartas de Final"/>
            </View>}

            {/* Semifinal */}
            {item[0][0].left && <View style={styles.jogos}>
                <ExibeJogo item={item[0][0].left} titulo="Semifinal"/>
            </View>}

            {/* Final */}
            <View style={styles.final}>
                <ExibeJogo item={item[0][0]} final={true} titulo="Final"/>
            </View>

            {/* Semifinal */}
            {item[0][0].left && <View style={styles.jogos}>
                <ExibeJogo item={item[0][0].right} titulo="Semifinal"/>
            </View>}
            
            {/* Quartas de Final */}
            {item[0][0].left?.left && <View style={styles.jogos}>
                <ExibeJogo item={item[0][0].right.left} titulo="Quartas de Final"/>
                <ExibeJogo item={item[0][0].right.right} titulo="Quartas de Final"/>
            </View>}
            
            {/* Oitavas de Final */}
            {item[3] && <View style={styles.jogos}>
                <ExibeJogo item={item[3][4]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][5]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][6]} titulo="Oitavas de Final"/>
                <ExibeJogo item={item[3][7]} titulo="Oitavas de Final"/>
            </View>}
        </View>
    );
}

export function ExibeJogo ({item, final = false, titulo = null}) {
    const eventos = () => {
        return (<View style={!final && styles.row}>
            {item.eventIds && <Jogos id={item.eventIds[0]} final={final}/>}
        </View>)
    };
    const simulaEventos = () => {
        return (<>
            <JogoFuturo tamanhoImg={30} altura={40} final={final}/>
        </>)
    };

    return (<View>
        {final && <View style={styles.jogo}>
            {(item.leftParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoLeft}/>}
            <Text style={styles.txtX}>{titulo}</Text>
            {(item.rightParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoRight}/>}
        </View>}
        <View>
            {(item.eventIds.length > 0) ? eventos() : simulaEventos()}
        </View>
    </View>);
}

export function Jogos({id, final = false}) {
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
                altura={100}
                final={final}
            />}
        </>
    );
}
