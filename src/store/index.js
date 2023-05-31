// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { listaTimes } from "./listaTimes";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina os tipos de ações
const SET_TIME = 'SET_TIME';
const SET_LISTA_TIME = 'SET_LISTA_TIME';
const SET_CARREGAR_JOGOS = 'SET_CARREGAR_JOGOS';
const SET_INTERVALO = 'SET_INTERVALO';

// Defina o estado inicial
const initialState = {
    meuTime: null,
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['carregarJogos', 'intervalo'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
