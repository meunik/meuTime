import {
    api,
    urlEventos,
    
    urlBrasileirao,
    urlCopaDoBrasil,
    urlCopaNordeste,

    urlCariocao,

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

export const brasileirao = async()=> await request(`${urlBrasileirao}standings/total`, 'standings', true);
export const brasileiraoArtilheiros = async()=> await request(`${urlBrasileirao}statistics?limit=100&order=-goals&group=attack`, 'results');
export const brasileiraoJogosDepois = async(num=0)=> await request(`${urlBrasileirao}events/next/${num}`);
export const brasileiraoJogosAntes = async(num=0)=> await request(`${urlBrasileirao}events/last/${num}`);
export const brasileiraoRodada = async()=> await request(`${urlBrasileirao}rounds`, 'currentRound');

export const copaDoBrasil = async()=> await request(`${urlCopaDoBrasil}cuptrees/structured`, 'cupTrees', true);
export const copaDoBrasilJogos = async()=> await request(`${urlCopaDoBrasil}cuptrees`, 'cupTrees');
export const copaDoBrasilJogosDepois = async(num=0)=> await request(`${urlCopaDoBrasil}events/next/${num}`);
export const copaDoBrasilJogosAntes = async(num=0)=> await request(`${urlCopaDoBrasil}events/last/${num}`);
export const copaDoBrasilRodada = async()=> await request(`${urlCopaDoBrasil}rounds`, 'currentRound');

export const copaNordeste = async()=> await request(`${urlCopaNordeste}standings/total`, 'standings');
export const copaNordesteMataMata = async()=> await request(`${urlCopaNordeste}cuptrees/structured`, 'cupTrees');

export const cariocao = async()=> await request(`${urlCariocao}standings/total`, 'standings');
export const cariocaoMataMata = async()=> await request(`${urlCariocao}cuptrees/structured`, 'cupTrees');

export const copaSulamericana = async()=> await request(`${urlSulamericana}standings/total`, 'standings');
export const sulamericanaMataMata = async()=> await request(`${urlSulamericana}cuptrees/structured`, 'cupTrees');
export const sulamericanaJogosDepois = async(num=0)=> await request(`${urlSulamericana}events/next/${num}`);
export const sulamericanaJogosAntes = async(num=0)=> await request(`${urlSulamericana}events/last/${num}`);
export const sulamericanaRodada = async()=> await request(`${urlSulamericana}rounds`, 'currentRound');

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