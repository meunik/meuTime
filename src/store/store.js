import {
    api,
    urlTime,
    urlBase,
    urlEvento,
    urlEventos,
    urlTorneio,
    urlSeason,
    
    urlBrasileirao,
} from '@/src/store/api';


export const getTimes = async(id, season)=> await request(`${urlTorneio(id, season)}statistics/info`, 'teams');

export const getSeasons = async(id)=> await request(urlSeason(id), 'seasons', true);

//sobre a pertida
export const getEscalacao = async(id)=> await request(`${urlEvento(id)}lineups`);
export const getTecnicos = async(id)=> await request(`${urlEvento(id)}managers`);
export const getEstatisticas = async(id)=> await request(`${urlEvento(id)}statistics`, 'statistics');
export const getIncidents = async(id)=> await request(`${urlEvento(id)}incidents`, 'incidents');
export const getHighlights = async(id)=> await request(`${urlEvento(id)}highlights`, 'highlights');
export const getChannel = async(id, idEvento)=> await request(`${urlChannel(id, idEvento)}`, 'tvChannelVotes');

export const time = async(id)=> await request(`${id}`, 'team');
export const img = async(id)=> await request(`${id}/image`);
export const jogosDepois = async(id, num=0)=> await request(`${id}/events/next/${num}`);
export const jogosAntes = async(id, num=0)=> await request(`${id}/events/last/${num}`);
// export const jogosAntes = async(id, num=0)=> await request(`${id}/events/last/${num}`, 'events');
export const torneios = async(id)=> await request(`${id}/unique-tournaments`, 'uniqueTournaments');
export const jogadores = async(id)=> await request(`${id}/players`, 'players');

export const proximoJogo = async(id)=> await request(`${id}/near-events`);
export const evento = async(id)=> await request(`${urlEventos}${id}`, 'event');

export const torneioInfo = async(id)=> await request(`${urlBase}unique-tournament/${id}`);
export const torneioSeasons = async(id)=> await request(`${id}/standings/seasons`, 'tournamentSeasons');
// export const torneioSeasons = async(id)=> await request(`${id}/standings/seasons`, 'tournamentSeasons');
export const torneioCopa = async(id, season)=> await request(`${urlTorneio(id, season)}cuptrees/structured`, 'cupTrees', true);
export const torneio = async(id, season, first = false)=> await request(`${urlTorneio(id, season)}standings/total`, 'standings', first);
export const torneioJogos = async(id, season)=> await request(`${urlTorneio(id, season)}cuptrees`, 'cupTrees');
export const torneioArtilheiros = async(id, season)=> await request(`${urlTorneio(id, season)}statistics?limit=100&order=-goals&group=attack`, 'results');
export const torneioMataMata = async(id, season)=> await request(`${urlTorneio(id, season)}cuptrees/structured`, 'cupTrees');
export const torneioJogosDepois = async(id, season, num=0)=> await request(`${urlTorneio(id, season)}events/next/${num}`);
export const torneioJogosAntes = async(id, season, num=0)=> await request(`${urlTorneio(id, season)}events/last/${num}`);
export const torneioRodada = async(id, season)=> await request(`${urlTorneio(id, season)}rounds`, 'currentRound');
export const torneioUltimosEventos = async(id, season)=> await request(`${urlTorneio(id, season)}team-events/total`, 'tournamentTeamEvents');

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