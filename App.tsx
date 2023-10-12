import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import UserPage from './src/pages/EditUser';
import RoleRegisterPage from './src/pages/RoleRegister';
import RoleListPage from "./src/pages/RoleList";
import UserListPage from './src/pages/UserList';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Acesso" component={LoginPage} />
                <Stack.Screen name="Home" component={HomePage} options={{ title: 'Auth App' }} />
                <Stack.Screen name="UserPage" component={UserPage} />
                <Stack.Screen name="RoleRegister" component={RoleRegisterPage} />
                <Stack.Screen name="RoleList" component={RoleListPage} />
                <Stack.Screen name="UserList" component={UserListPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}