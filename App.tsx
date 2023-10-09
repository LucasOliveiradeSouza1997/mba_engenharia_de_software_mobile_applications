import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import UserPage from './src/pages/EditUser';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Acesso" component={LoginPage} />
                <Stack.Screen name="Home" component={HomePage} options={{ title: 'Auth App' }} />
                <Stack.Screen name="UserPage" component={UserPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}