import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
import { JogoAtivo } from '@/src/components/Jogo';

export function Eliminatoria({item, nome, vertical = false}) {
    return (
        <View style={styles.container}>
            <Text style={styles.txtX}>{nome}</Text>
            <ScrollView horizontal style={{padding:0}}>
                {item && <MataMata item={item} vertical={vertical}/>}
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
                <ExibeJogo item={item.left.left.left}/>
                <ExibeJogo item={item.left.left.right}/>
                <ExibeJogo item={item.left.right.left}/>
                <ExibeJogo item={item.left.right.right}/>

                <ExibeJogo item={item.right.left.left}/>
                <ExibeJogo item={item.right.left.right}/>
                <ExibeJogo item={item.right.right.left}/>
                <ExibeJogo item={item.right.right.right}/>
            </View>}
            
            {/* Quartas de Final */}
            {item.left?.left && <View style={cssJogos}>
                <ExibeJogo item={item.left.left}/>
                <ExibeJogo item={item.left.right}/>
                <ExibeJogo item={item.right.left}/>
                <ExibeJogo item={item.right.right}/>
            </View>}

            {/* Semifinal */}
            {item.left && <View style={cssJogos}>
                <ExibeJogo item={item.left}/>
                <ExibeJogo item={item.right}/>
            </View>}

            {/* Final */}
            <View style={cssJogos}>
                <ExibeJogo item={item} final={true}/>
            </View>
        </View>
    );
}

export function ExibeJogo ({item, final = false}) {
    return (<View>
        <View style={styles.jogo}>
            {(item.leftParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoLeft}/>}
            <Text style={styles.txtX}>{item.round.description}</Text>
            {(item.rightParticipant?.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoRight}/>}
        </View>
        <View>
            {item.eventIds && <Jogos id={item.eventIds[0]}/>}
            {(item.eventIds.length > 1) && <Jogos id={item.eventIds[1]}/>}
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
