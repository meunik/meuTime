import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, useWindowDimensions, ScrollView } from 'react-native';
import { getSeasons, getEstatisticasTime, torneios as getTorneios } from '@/src/store/store';
import { urlTime } from '@/src/store/api';
import { SelectTorneios } from "./SelectTorneios";
import { Lista } from "@/src/components/Lista";

import { styles } from "./styles";
import ptBr from "@/src/Utils/ptBr";

export function TimeInfo() {
    const meuTime = useSelector(state => state.meuTime);
    
    const [refreshing, setRefreshing] = useState(false);
    const [estatistica, setEstatistica] = useState(null);

    const [passesHome, setPassesHome] = useState(null);
    const [passesAway, setPassesAway] = useState(null);

    const [passesHomePorcent, setPassesHomePorcent] = useState(null);
    const [passesAwayPorcent, setPassesAwayPorcent] = useState(null);

    const [selectedTorneio, setSelectedTorneio] = useState(null);
    const handleTorneioChange = (torneio) => setSelectedTorneio(torneio);

    const layout = useWindowDimensions();

    const buscarTimes = async () => {
        const torneiosTemp = await getTorneios(meuTime?.id);
        const estatisticasTemp = {total:{}};

        for (const torneio of torneiosTemp) {
            if (!meuTime || !torneio) continue;
            try {
                const seasonsTemp = await getSeasons(torneio?.id);
                const est = await getEstatisticasTime(meuTime?.id, torneio?.id, seasonsTemp.id);
                if (est) estatisticasTemp[torneio.id] = est;
            } catch (error) {continue}
        }

        for (const [index, value] of Object.entries(estatisticasTemp)) {
            if (typeof value === 'object' && value !== null && index !== 'total') {
                for (const [i, v] of Object.entries(value)) {
                    if (!i) continue;
                    estatisticasTemp.total[i] = (estatisticasTemp.total[i]) ? estatisticasTemp.total[i] + v : v;
                }
            }
        }

        console.log(meuTime);
        console.log(torneiosTemp);
        console.log(estatisticasTemp);

        setEstatistica(estatisticasTemp);
        setRefreshing(false);
    };

    useEffect(() => {
        setRefreshing(true);
        buscarTimes();
    }, []);

    function renderItens(item, key, seila, itemKey) {
        let linha = false;
        let texto = 'txtEstatisticasNum';
        // console.log(item, key, seila, itemKey);

        switch (itemKey) {
            case "goalsScored": titulo = 'Gols'; break;
        
            default: titulo = null; break;
        }

        // if (itemKey == 'Passes') {
        //     if (item.home) setPassesHome(item.home);
        //     if (item.away) setPassesAway(item.away);
        // }

        // if (itemKey == 'Accurate passes') {
        //     setPassesHomePorcent(Math.floor((item.home / passesHome) * 100))
        //     setPassesAwayPorcent(Math.floor((item.away / passesAway) * 100))
        // }

        return (ptBr[itemKey] && itemKey && key) && (<View key={key}>
            {/* {linha && <View style={styles.linhaPH}></View>} */}
            <View style={styles.rowEstatistica}>
                <Text style={styles.txtEstatisticasNome}>{ptBr[itemKey]}</Text>
                <View style={styles.bolinhaNum}>
                    <Text style={styles[texto]}>
                        {item.toFixed(0)}
                    </Text>
                </View>
            </View>
        </View>);
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={styles.img}
                    resizeMode="center"
                    source={{ uri: `${urlTime}${meuTime && meuTime.id}/image` }}
                />
                {layout.width > 350 && <Text style={styles.txtLogo}>{meuTime && meuTime.shortName}</Text>}
            </View>

            <SelectTorneios onTorneioChange={handleTorneioChange} />

            {estatistica && selectedTorneio && (
                <ScrollView contentContainerStyle={styles.tabsContainer}>
                    <View style={styles.estatisticaContainer}>
                        <Text style={styles.txtInfo}>Estatísticas</Text>
                        <Lista data={estatistica[selectedTorneio]} renderItem={renderItens} />
                    </View>
                </ScrollView>
            )}

            {/* <View style={styles.logo}>
                <Text style={styles.txtInfo}>aaaaaaaaaaa</Text>
            </View>
            <Text style={styles.txtInfo}>aaaaaaaaaaa</Text> */}
        </View>
    );
}
