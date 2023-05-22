import axios from 'axios';
const urlBase = `https://api.sofascore.com/api/v1/`;
const url = `${urlBase}team/1958/`;
const urlBrasileirao = `${urlBase}unique-tournament/325/season/48982/`;
const urlEventos = `${urlBase}event/`;
const api = axios.create({
    baseURL: url,
    timeout: 3000
});
export {
    api,
    url,
    urlBase,
    urlBrasileirao,
    urlEventos,
}