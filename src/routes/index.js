import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from "@/src/routes/auth.routes.js";

export function Routes() {
    return(
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}