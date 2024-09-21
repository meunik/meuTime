// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { listaTimes } from "./listaTimes";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina os tipos de ações
const SET_TIME = 'SET_TIME';
const SET_TORNEIO_LIST = 'SET_TORNEIO_LIST';
const SET_TORNEIO = 'SET_TORNEIO';
const SET_TORNEIO_ID = 'SET_TORNEIO_ID';
const SET_SEASON = 'SET_SEASON';
const SET_LISTA_TIME = 'SET_LISTA_TIME';
const SET_CARREGAR_JOGOS = 'SET_CARREGAR_JOGOS';
const SET_INTERVALO = 'SET_INTERVALO';

// Defina o estado inicial
const initialState = {
    meuTime: null,
    torneioList: [],
    torneio: null,
    torneioId: null,
    season: null,
    listaTimes: listaTimes,
    carregarJogos: true,
    intervalo: null,
};

// Defina o reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIME: return { ...state, meuTime: action.payload };
        case SET_TORNEIO_LIST: return { ...state, torneioList: action.payload };
        case SET_TORNEIO: return { ...state, torneio: action.payload };
        case SET_TORNEIO_ID: return { ...state, torneioId: action.payload };
        case SET_SEASON: return { ...state, season: action.payload };
        case SET_LISTA_TIME: return { ...state, listaTimes: action.payload };
        case SET_CARREGAR_JOGOS: return { ...state, carregarJogos: action.payload };
        case SET_INTERVALO: return { ...state, intervalo: action.payload };
        default: return state;
    }
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['carregarJogos', 'intervalo', 'listaTimes'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
