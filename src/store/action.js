// src/store/actions.js

// Defina as ações
export const setMeuTime = (time) => ({
    type: 'SET_TIME',
    payload: time,
});
export const setTorneio = (torneio) => ({
    type: 'SET_TORNEIO',
    payload: torneio,
});
export const setTorneioId = (torneioId) => ({
    type: 'SET_TORNEIO_ID',
    payload: torneioId,
});
export const setListaTimes = (listaTimes) => ({
    type: 'SET_LISTA_TIME',
    payload: listaTimes,
});
export const setCarregarJogos = (carregarJogos) => ({
    type: 'SET_CARREGAR_JOGOS',
    payload: carregarJogos,
});
export const setIntervalo = (intervalo) => ({
    type: 'SET_INTERVALO',
    payload: intervalo,
});
