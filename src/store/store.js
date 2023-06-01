import { api, urlTime, urlBase, urlBrasileirao, urlEventos } from '@/src/store/api';

export const time = async (id) => await request(id, '', 'team');
export const img = async (id) => await request(id, 'image', '');
export const jogosDepois = async (id) => await request(id, 'events/next/0', 'events');
export const jogosAntes = async (id) => await request(id, 'events/last/0', 'events');
export const torneios = async (id) => await request(id, 'unique-tournaments', 'uniqueTournaments');
export const jogadores = async (id) => await request(id, 'players', 'players');

async function request(id, url, param) {
    try {
        const response = await api.get(`${id}/${url}`);
        return (response.data) ? response.data[param] : null;
    } catch (error) {
        console.error(error, 'request: '+url);
        return null;
    }
}

export const evento = async (id) => {
    try {
        const response = await api.get(`${urlEventos}${id}`);
        return (response.data) ? response.data.event : null;
    } catch (error) {
        console.error(error, 'evento');
        return null;
    }
}
export const proximoJogo = async (id) => {
    try {
        const response = await api.get(`${id}/near-events`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error, 'proximoJogo');
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
        console.error(error, 'requestCampeonatoBrasileirao');
        return null;
    }
}

export const brasileiraoJogosDepois = async (num = 0) => {
    try {
        const response = await api.get(`${urlBrasileirao}events/next/${num}`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error, 'brasileiraoJogosDepois');
        return null;
    }
}
export const brasileiraoJogosAntes = async (num = 0) => {
    try {
        const response = await api.get(`${urlBrasileirao}events/last/${num}`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error, 'brasileiraoJogosAntes');
        return null;
    }
}

export const copaDoBrasil = async (id) => {
    try {
        const response = await api.get(`https://api.sofascore.com/api/v1/unique-tournament/373/season/48876/cuptrees`);
        return (response.data) ? response.data : null;
    } catch (error) {
        console.error(error, 'copaDoBrasil');
        return null;
    }
}
export const cariocao = async () => await requestCampeonatoCarioca('standings/total', 'standings', true);

async function requestCampeonatoCarioca(url, param, first = false) {
    try {
        const response = await api.get(urlCariocao + url);
        if (first) {
            return (response.data) ? response.data[param][0] : null;
        } else {
            return (response.data) ? response.data[param] : null;
        }
    } catch (error) {
        console.error(error, 'requestCampeonatoCariocao');
        return null;
    }
}