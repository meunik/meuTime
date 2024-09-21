import axios from 'axios';

const urlBase = `https://api.sofascore.com/api/v1/`;
const url = `${urlBase}team/1958/`;
const urlTime = `${urlBase}team/`;
const urlEventos = `${urlBase}event/`;

const urlBrasileirao = `${urlBase}unique-tournament/325/season/48982/`;

const api = axios.create({
    baseURL: urlTime,
    timeout: 3000
});

export const urlTimeId = (id) => `${urlTime}${id}/`;
export const urlEvento = (id) => `${urlEventos}${id}/`;
export const urlChannel = (id, idEvento) => `${urlEventos}tv/channel/${id}/event/${idEvento}/votes`;
export const urlSeason = (id) => `${urlBase}unique-tournament/${id}/seasons`;
// export const urlTorneio = (id, season) => `${urlBase}unique-tournament/${id}/season/${seasons[id]['season']}/`;
export const urlTorneio = (id, season) => `${urlBase}unique-tournament/${id}/season/${season}/`;
/*
export const seasons = {
    92: { // Cariocao
        season: 47664,
        legenda: [
            {
                cor: 'bolinhaCampeao',
                texto: 'Campeão da Taça Guanabara e Semifinalistas',
            },
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinalistas',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Taça Rio',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    372: { // Paulistao
        season: 47661,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificados',
            },
        ],
    },
    379: { // Mineiro
        season: 47947,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificados',
            },
        ],
    },
    378: { // Cearense
        season: 47690,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinal',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Quartas de final',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    374: { // Baiano
        season: 47686,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    377: { // Gaucho
        season: 47663,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    382: { // Paranaense
        season: 48061,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    381: { // Goiano
        season: 47682,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    11670: { // MatoGrossense
        season: 47691,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinal',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Quartas de final',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    325: { // Brasileirao
        season: 48982,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Libertadores',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Pré Libertadores',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Sulamericana',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    373: { // CopaDoBrasil
        season: 48876,
        legenda: null,
    },
    1596: { // CopaNordeste
        season: 47716,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Quartas de Final',
            },
        ],
    },
    10158: { // CopaVerde
        season: 48077,
        legenda: null,
    },
    480: { // Sulamericana
        season: 47968,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Repescagem',
            },
        ],
    },
    384: { // Libertadores
        season: 47974,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Sulamericana',
            },
        ],
    },
};
*/

export {
    api,
    url,
    urlBase,
    urlTime,
    urlEventos,

    urlBrasileirao,
}