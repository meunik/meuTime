import { api, url, urlBase, urlBrasileirao, urlEventos } from '@/src/store/api';

export const time = async () => await request('', 'team');
export const img = async () => await request('image', '');
export const jogosDepois = async () => await request('events/next/0', 'events');
export const jogosAntes = async () => await request('events/last/0', 'events');
export const torneios = async () => await request('unique-tournaments', 'uniqueTournaments');
export const jogadores = async () => await request('players', 'players');

async function request(url, param) {
    try {
        const response = await api.get(url);
        return (response.data) ? response.data[param] : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const evento = async (id) => {
    try {
        // id = '11067460';
        const response = await api.get(`${urlEventos}${id}`);
        // console.log(response.data.event);
        return (response.data) ? response.data.event : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const proximoJogo = async (id) => {
    try {
        const response = await api.get(`${url}near-events`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const brasileirao = async () => await requestCampeonatoBrasileirao('standings/total', 'standings', true);
export const brasileiraoArtilheiros = async () => await requestCampeonatoBrasileirao('statistics?limit=100&order=-goals&group=attack', 'results');

async function requestCampeonatoBrasileirao(url, param, first = false) {
    try {
        const response = await api.get(urlBrasileirao + url);
        if (first) {
            return (response.data) ? response.data[param][0] : null;
        } else {
            return (response.data) ? response.data[param] : null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const copaDoBrasil = async (id) => {
    try {
        const response = await api.get(`https://api.sofascore.com/api/v1/unique-tournament/373/season/48876/cuptrees`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}