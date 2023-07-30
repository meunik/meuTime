import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/src/store';

import * as NavigationBar from 'expo-navigation-bar';
import { Routes } from '@/src/routes';

import { Background } from '@/src/components/Background';
import { theme } from "@/src/global/styles/theme";

export default function App() {
    NavigationBar.setBackgroundColorAsync(theme.colors.fundo);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Background>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                    <Routes />
                </Background>
            </PersistGate>
        </Provider>
    );
}