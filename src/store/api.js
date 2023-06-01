import axios from 'axios';

const urlBase = `https://api.sofascore.com/api/v1/`;
const url = `${urlBase}team/1958/`;
const urlTime = `${urlBase}team/`;
const urlEventos = `${urlBase}event/`;

const urlBrasileirao = `${urlBase}unique-tournament/325/season/48982/`;
const urlCariocao = `${urlBase}unique-tournament/92/season/47664/`;

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

    urlBrasileirao,
    urlCariocao,
}