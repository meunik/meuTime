// store.js
import { createStore } from 'redux';
import { listaTimes } from "./listaTimes";

// Defina os tipos de ações
const SET_TIME = 'SET_TIME';
const SET_LISTA_TIME = 'SET_LISTA_TIME';
const SET_CARREGAR_JOGOS = 'SET_CARREGAR_JOGOS';
const SET_INTERVALO = 'SET_INTERVALO';

// Defina o estado inicial
const initialState = {
    meuTime: {
        name: "Botafogo",
        slug: "botafogo",
        shortName: "Botafogo",
        nameCode: "BOT",
        id: 1958,
        teamColors: {
            primary: "#000000",
            secondary: "#ffffff",
            text: "#ffffff"
        }
    },
    listaTimes: listaTimes,
    carregarJogos: true,
    intervalo: null,
};

// Defina o reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIME: return { ...state, meuTime: action.payload };
        case SET_LISTA_TIME: return { ...state, listaTimes: action.payload };
        case SET_CARREGAR_JOGOS: return { ...state, carregarJogos: action.payload };
        case SET_INTERVALO: return { ...state, intervalo: action.payload };
        default: return state;
    }
};

// Crie a store
const store = createStore(reducer);

export default store;
