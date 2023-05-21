import React from 'react';
import { StatusBar } from 'react-native';
import { Routes } from '@/src/routes';
import { Background } from '@/src/components/Background';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from "@/src/global/styles/theme";

export default function App() {
    NavigationBar.setBackgroundColorAsync(theme.colors.nav);

    return (
        <Background>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Routes />
        </Background>
    );
}