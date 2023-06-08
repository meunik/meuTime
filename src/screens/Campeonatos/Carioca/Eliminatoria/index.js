import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
import { JogoAtivo } from '@/src/components/Jogo';
// import { View, Text, StyleSheet, Animated } from 'react-native';

// import { Teste } from "./Teste";

export function Eliminatoria({item, nome}) {

    return (
        <View style={styles.container}>
            <Text style={styles.txtX}>{nome}</Text>
            <View style={styles.playoffs}>
                <ExibeJogo item={item} final={true}/>
                <View style={styles.semiFinal}>
                    <ExibeJogo item={item.left}/>
                    <ExibeJogo item={item.right}/>
                </View>
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
