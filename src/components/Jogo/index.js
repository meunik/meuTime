import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { urlBase } from '@/src/store/api';
import { tempoJogo } from "@/src/Utils/TempoJogo";
import { styles } from "./styles";

const tituloJogo = (jogo) => {
    const campeonato = jogo.tournament.uniqueTournament.name;
    // console.log(jogo);
    switch (jogo.roundInfo?.cupRoundType) {
        case 1: return `${campeonato} - ${jogo.roundInfo.name}`;
        case 8: return `${campeonato} - Oitavas de final`;
    
        default: return `${campeonato} - ${jogo.roundInfo.round}ª Rodada`;
    }
};

export const jogoAtivo = ({jogo}) => (
    <View style={styles.jogoRolando}>
        <View style={styles.topo}>
            <Text style={{ color: jogo.tournament.uniqueTournament.secondaryColorHex, ...styles.txtcampeonato }}>
                {tituloJogo(jogo)}
            </Text>
        </View>
        <View style={styles.timesUltimoJogo}>

            <View style={styles.timeCasa}>
                <View style={styles.cartaoVermelhoContainer}>
                    {jogo.homeRedCards && (() => {
                        const items = [];
                        for (let i = 0; i < jogo.homeRedCards; i++) {
                            items.push(
                                <Icon key={'homeRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartaoVermelho} />
                            );
                        }
                        return items;
                    })()}
                </View>
                <Text style={styles.txtTime}>{jogo.homeTeam.nameCode}</Text>
                <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.homeTeam.id}/image` }} />
                <Text style={styles.txtTime}>{jogo.homeScore.display}</Text>
            </View>

            <Text style={styles.txtX}>x</Text>

            <View style={styles.timeVisitante}>
                <Text style={styles.txtTime}>{jogo.awayScore.display}</Text>
                <Image style={styles.imgLista} resizeMode="center" source={{ uri: `${urlBase}team/${jogo.awayTeam.id}/image` }} />
                <Text style={styles.txtTime}>{jogo.awayTeam.nameCode}</Text>
                <View style={styles.cartaoVermelhoContainer}>
                    {jogo.awayRedCards && (() => {
                    const items = [];
                    for (let i = 0; i < jogo.awayRedCards; i++) {
                        items.push(
                            <Icon key={'awayRedCards'+i} name="card" size={10} color="#e35c47" style={styles.cartaoVermelho} />
                        );
                    }
                    return items;
                    })()}
                </View>
            </View>

        </View>
        {((jogo.status.code == 500)||(jogo.status.code == 120))&&
        <View style={styles.placarPenaltis}>
            <Text style={styles.txtPenaltis}>({jogo.homeScore.current-jogo.homeScore.display} x {jogo.awayScore.current-jogo.awayScore.display})</Text>
        </View>}
        <View style={styles.rodape}>
            <Text style={styles.txtTempo}>{tempoJogo(jogo)}</Text>
        </View>
    </View>
);