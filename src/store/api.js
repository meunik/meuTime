import axios from 'axios';

const urlBase = `https://api.sofascore.com/api/v1/`;
const url = `${urlBase}team/1958/`;
const urlTime = `${urlBase}team/`;
const urlEventos = `${urlBase}event/`;

const urlCariocao = `${urlBase}unique-tournament/92/season/47664/`;
const urlPaulistao = `${urlBase}unique-tournament/372/season/47661/`;

const urlBrasileirao = `${urlBase}unique-tournament/325/season/48982/`;
const urlCopaDoBrasil = `${urlBase}unique-tournament/373/season/48876/`;
const urlCopaNordeste = `${urlBase}unique-tournament/1596/season/47716/`;

const urlSulamericana = `${urlBase}unique-tournament/480/season/47968/`;
const urlLibertadores = `${urlBase}unique-tournament/384/season/47974/`;

const api = axios.create({
    baseURL: urlTime,
    timeout: 3000
});

export {
    api,
    url,
    urlBase,
    urlTime,
    urlEventos,
    
    urlCariocao,
    urlPaulistao,

    urlBrasileirao,
    urlCopaDoBrasil,
    urlCopaNordeste,

    urlSulamericana,
    urlLibertadores,
}