import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { evento } from '@/src/store/store';
import { JogoAtivo } from '@/src/components/Jogo';

export function Eliminatoria({item, nome}) {

    const exibeJogo = (item, final = false) => {
        return (<View>
            <View style={styles.jogo}>
                {(item.leftParticipant.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoLeft}/>}
                <Text style={styles.txtX}>{item.round.description}</Text>
                {(item.rightParticipant.winner && final) && <Icon name="trophy" size={20} color="#dbb234" style={styles.campeaoRight}/>}
            </View>
            <View>
                {/* continuar aqui */}
                <Jogos id={item.eventIds[0]}/>
                <Jogos id={item.eventIds[1]}/>
            </View>
        </View>);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.txtX}>{nome}</Text>
            <View style={styles.playoffs}>
                {exibeJogo(item, true)}
                <View style={styles.semiFinal}>
                    {exibeJogo(item.left)}
                    {exibeJogo(item.right)}
                </View>
            </View>
        </View>
    );
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
