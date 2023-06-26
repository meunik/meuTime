import {
    api,
    urlTime,
    urlBase,
    urlEventos,
    urlTorneio,
    
    urlBrasileirao,
} from '@/src/store/api';

export const time = async(id)=> await request(`${id}`, 'team');
export const img = async(id)=> await request(`${id}/image`);
export const jogosDepois = async(id)=> await request(`${id}/events/next/0`, 'events');
export const jogosAntes = async(id)=> await request(`${id}/events/last/0`, 'events');
export const torneios = async(id)=> await request(`${id}/unique-tournaments`, 'uniqueTournaments');
export const jogadores = async(id)=> await request(`${id}/players`, 'players');

export const proximoJogo = async(id)=> await request(`${id}/near-events`);
export const evento = async(id)=> await request(`${urlEventos}${id}`, 'event');

export const torneioInfo = async(id)=> await request(`${urlBase}unique-tournament/${id}`);
export const torneioSeasons = async(id)=> await request(`${id}/standings/seasons`, 'tournamentSeasons');
export const torneioCopa = async(id)=> await request(`${urlTorneio(id)}cuptrees/structured`, 'cupTrees', true);
export const torneio = async(id, first = false)=> await request(`${urlTorneio(id)}standings/total`, 'standings', first);
export const torneioJogos = async(id)=> await request(`${urlTorneio(id)}cuptrees`, 'cupTrees');
export const torneioArtilheiros = async(id)=> await request(`${urlTorneio(id)}statistics?limit=100&order=-goals&group=attack`, 'results');
export const torneioMataMata = async(id)=> await request(`${urlTorneio(id)}cuptrees/structured`, 'cupTrees');
export const torneioJogosDepois = async(id, num=0)=> await request(`${urlTorneio(id)}events/next/${num}`);
export const torneioJogosAntes = async(id, num=0)=> await request(`${urlTorneio(id)}events/last/${num}`);
export const torneioRodada = async(id)=> await request(`${urlTorneio(id)}rounds`, 'currentRound');

export const brasileiraoInfo = async()=> await request(`${urlBase}unique-tournament/325`);
export const brasileirao = async()=> await request(`${urlBrasileirao}standings/total`, 'standings', true);
export const brasileiraoArtilheiros = async()=> await request(`${urlBrasileirao}statistics?limit=100&order=-goals&group=attack`, 'results');
export const brasileiraoJogosDepois = async(num=0)=> await request(`${urlBrasileirao}events/next/${num}`);
export const brasileiraoJogosAntes = async(num=0)=> await request(`${urlBrasileirao}events/last/${num}`);
export const brasileiraoRodada = async()=> await request(`${urlBrasileirao}rounds`, 'currentRound');

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