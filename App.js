import React from 'react';
import { StatusBar } from 'react-native';
import { Routes } from '@/src/routes';
import { Background } from '@/src/components/Background';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";
import { Provider } from 'react-redux';
import store from '@/src/store';

export default function App() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

    return (
        <Provider store={store}>
            <Background>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <Routes />
            </Background>
        </Provider>
    );
}