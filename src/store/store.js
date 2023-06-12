import {
    api,
    urlBase,
    urlEventos,
    
    urlBrasileirao,
    urlCopaDoBrasil,
    urlCopaNordeste,

    urlCariocao,
    urlPaulistao,
    urlMineiro,
    urlCearense,
    urlBaiano,
    urlGaucho,
    urlParanaense,
    urlGoiano,
    urlMatoGrossense,

    urlSulamericana,
    urlLibertadores,
} from '@/src/store/api';

export const time = async(id)=> await request(`${id}`, 'team');
export const img = async(id)=> await request(`${id}/image`);
export const jogosDepois = async(id)=> await request(`${id}/events/next/0`, 'events');
export const jogosAntes = async(id)=> await request(`${id}/events/last/0`, 'events');
export const torneios = async(id)=> await request(`${id}/unique-tournaments`, 'uniqueTournaments');
export const jogadores = async(id)=> await request(`${id}/players`, 'players');

export const proximoJogo = async(id)=> await request(`${id}/near-events`);
export const evento = async(id)=> await request(`${urlEventos}${id}`, 'event');

export const brasileiraoInfo = async()=> await request(`${urlBase}unique-tournament/325`);
export const brasileirao = async()=> await request(`${urlBrasileirao}standings/total`, 'standings', true);
export const brasileiraoArtilheiros = async()=> await request(`${urlBrasileirao}statistics?limit=100&order=-goals&group=attack`, 'results');
export const brasileiraoJogosDepois = async(num=0)=> await request(`${urlBrasileirao}events/next/${num}`);
export const brasileiraoJogosAntes = async(num=0)=> await request(`${urlBrasileirao}events/last/${num}`);
export const brasileiraoRodada = async()=> await request(`${urlBrasileirao}rounds`, 'currentRound');

export const copaDoBrasilInfo = async()=> await request(`${urlBase}unique-tournament/373`);
export const copaDoBrasil = async()=> await request(`${urlCopaDoBrasil}cuptrees/structured`, 'cupTrees', true);
export const copaDoBrasilJogos = async()=> await request(`${urlCopaDoBrasil}cuptrees`, 'cupTrees');
export const copaDoBrasilJogosDepois = async(num=0)=> await request(`${urlCopaDoBrasil}events/next/${num}`);
export const copaDoBrasilJogosAntes = async(num=0)=> await request(`${urlCopaDoBrasil}events/last/${num}`);
export const copaDoBrasilRodada = async()=> await request(`${urlCopaDoBrasil}rounds`, 'currentRound');

export const copaNordesteInfo = async()=> await request(`${urlBase}unique-tournament/1596`);
export const copaNordeste = async()=> await request(`${urlCopaNordeste}standings/total`, 'standings');
export const copaNordesteMataMata = async()=> await request(`${urlCopaNordeste}cuptrees/structured`, 'cupTrees');
export const copaNordesteJogosDepois = async(num=0)=> await request(`${urlCopaNordeste}events/next/${num}`);
export const copaNordesteJogosAntes = async(num=0)=> await request(`${urlCopaNordeste}events/last/${num}`);
export const copaNordesteRodada = async()=> await request(`${urlCopaNordeste}rounds`, 'currentRound');

export const cariocaoInfo = async()=> await request(`${urlBase}unique-tournament/92`);
export const cariocao = async()=> await request(`${urlCariocao}standings/total`, 'standings');
export const cariocaoMataMata = async()=> await request(`${urlCariocao}cuptrees/structured`, 'cupTrees');
export const cariocaoJogosDepois = async(num=0)=> await request(`${urlCariocao}events/next/${num}`);
export const cariocaoJogosAntes = async(num=0)=> await request(`${urlCariocao}events/last/${num}`);
export const cariocaoRodada = async()=> await request(`${urlCariocao}rounds`, 'currentRound');

export const paulistaoInfo = async()=> await request(`${urlBase}unique-tournament/372`);
export const paulistao = async()=> await request(`${urlPaulistao}standings/total`, 'standings');
export const paulistaoMataMata = async()=> await request(`${urlPaulistao}cuptrees/structured`, 'cupTrees');
export const paulistaoJogosDepois = async(num=0)=> await request(`${urlPaulistao}events/next/${num}`);
export const paulistaoJogosAntes = async(num=0)=> await request(`${urlPaulistao}events/last/${num}`);
export const paulistaoRodada = async()=> await request(`${urlPaulistao}rounds`, 'currentRound');

export const mineiroInfo = async()=> await request(`${urlBase}unique-tournament/379`);
export const mineiro = async()=> await request(`${urlMineiro}standings/total`, 'standings');
export const mineiroMataMata = async()=> await request(`${urlMineiro}cuptrees/structured`, 'cupTrees');
export const mineiroJogosDepois = async(num=0)=> await request(`${urlMineiro}events/next/${num}`);
export const mineiroJogosAntes = async(num=0)=> await request(`${urlMineiro}events/last/${num}`);
export const mineiroRodada = async()=> await request(`${urlMineiro}rounds`, 'currentRound');

export const cearenseInfo = async()=> await request(`${urlBase}unique-tournament/379`);
export const cearense = async()=> await request(`${urlCearense}standings/total`, 'standings');
export const cearenseMataMata = async()=> await request(`${urlCearense}cuptrees/structured`, 'cupTrees');
export const cearenseJogosDepois = async(num=0)=> await request(`${urlCearense}events/next/${num}`);
export const cearenseJogosAntes = async(num=0)=> await request(`${urlCearense}events/last/${num}`);
export const cearenseRodada = async()=> await request(`${urlCearense}rounds`, 'currentRound');

export const baianoInfo = async()=> await request(`${urlBase}unique-tournament/374`);
export const baiano = async()=> await request(`${urlBaiano}standings/total`, 'standings');
export const baianoMataMata = async()=> await request(`${urlBaiano}cuptrees/structured`, 'cupTrees');
export const baianoJogosDepois = async(num=0)=> await request(`${urlBaiano}events/next/${num}`);
export const baianoJogosAntes = async(num=0)=> await request(`${urlBaiano}events/last/${num}`);
export const baianoRodada = async()=> await request(`${urlBaiano}rounds`, 'currentRound');

export const gauchoInfo = async()=> await request(`${urlBase}unique-tournament/377`);
export const gaucho = async()=> await request(`${urlGaucho}standings/total`, 'standings');
export const gauchoMataMata = async()=> await request(`${urlGaucho}cuptrees/structured`, 'cupTrees');
export const gauchoJogosDepois = async(num=0)=> await request(`${urlGaucho}events/next/${num}`);
export const gauchoJogosAntes = async(num=0)=> await request(`${urlGaucho}events/last/${num}`);
export const gauchoRodada = async()=> await request(`${urlGaucho}rounds`, 'currentRound');

export const paranaenseInfo = async()=> await request(`${urlBase}unique-tournament/382`);
export const paranaense = async()=> await request(`${urlParanaense}standings/total`, 'standings');
export const paranaenseMataMata = async()=> await request(`${urlParanaense}cuptrees/structured`, 'cupTrees');
export const paranaenseJogosDepois = async(num=0)=> await request(`${urlParanaense}events/next/${num}`);
export const paranaenseJogosAntes = async(num=0)=> await request(`${urlParanaense}events/last/${num}`);
export const paranaenseRodada = async()=> await request(`${urlParanaense}rounds`, 'currentRound');

export const goianoInfo = async()=> await request(`${urlBase}unique-tournament/381`);
export const goiano = async()=> await request(`${urlGoiano}standings/total`, 'standings');
export const goianoMataMata = async()=> await request(`${urlGoiano}cuptrees/structured`, 'cupTrees');
export const goianoJogosDepois = async(num=0)=> await request(`${urlGoiano}events/next/${num}`);
export const goianoJogosAntes = async(num=0)=> await request(`${urlGoiano}events/last/${num}`);
export const goianoRodada = async()=> await request(`${urlGoiano}rounds`, 'currentRound');

export const matoGrossenseInfo = async()=> await request(`${urlBase}unique-tournament/11670`);
export const matoGrossense = async()=> await request(`${urlMatoGrossense}standings/total`, 'standings');
export const matoGrossenseMataMata = async()=> await request(`${urlMatoGrossense}cuptrees/structured`, 'cupTrees');
export const matoGrossenseJogosDepois = async(num=0)=> await request(`${urlMatoGrossense}events/next/${num}`);
export const matoGrossenseJogosAntes = async(num=0)=> await request(`${urlMatoGrossense}events/last/${num}`);
export const matoGrossenseRodada = async()=> await request(`${urlMatoGrossense}rounds`, 'currentRound');

export const copaSulamericanaInfo = async()=> await request(`${urlBase}unique-tournament/480`);
export const copaSulamericana = async()=> await request(`${urlSulamericana}standings/total`, 'standings');
export const sulamericanaMataMata = async()=> await request(`${urlSulamericana}cuptrees/structured`, 'cupTrees');
export const sulamericanaJogosDepois = async(num=0)=> await request(`${urlSulamericana}events/next/${num}`);
export const sulamericanaJogosAntes = async(num=0)=> await request(`${urlSulamericana}events/last/${num}`);
export const sulamericanaRodada = async()=> await request(`${urlSulamericana}rounds`, 'currentRound');

export const copaLibertadoresInfo = async()=> await request(`${urlBase}unique-tournament/384`);
export const copaLibertadores = async()=> await request(`${urlLibertadores}standings/total`, 'standings');
export const libertadoresMataMata = async()=> await request(`${urlLibertadores}cuptrees/structured`, 'cupTrees');
export const libertadoresJogosDepois = async(num=0)=> await request(`${urlLibertadores}events/next/${num}`);
export const libertadoresJogosAntes = async(num=0)=> await request(`${urlLibertadores}events/last/${num}`);
export const libertadoresRodada = async()=> await request(`${urlLibertadores}rounds`, 'currentRound');

async function request(url, param = null, first = false) {
    try {
        const response = await api.get(url);
        const data = response.data;
        if (data) {
            if (first && param) return data[param][0];

            return (param) ? data[param] : data;
        }

        return null;
    } catch (error) {
        console.error(error, url);
        return null;
    }
}

export const europaLeague = async () => {
    try {
        const response = await api.get('https://api.sofascore.com/api/v1/unique-tournament/679/season/44509/cuptrees/structured');
        return (response.data) ? response.data['cupTrees'] : null;
    } catch (error) {
        console.error(error, 'europaLeague');
        return null;
    }
}