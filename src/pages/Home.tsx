import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View,StyleSheet } from 'react-native';

export default function Home() {

    const navigation = useNavigation<any>();

    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={() => navigation.goBack()} />,
    });

    return (
        <View style={styles.container}>
            <View style={styles.button}>
            <Button title="Cadastrar Usuario" onPress={() => navigation.navigate('UserPage')} />
            </View>
            <View style={styles.button}>
            <Button title="Listar Usuarios" onPress={() => navigation.navigate('UserList')} />
            </View>
            <View style={styles.button}>
            <Button title="Cadastrar Role" onPress={() => navigation.navigate('RoleRegister')} />
            </View>
            <View style={styles.button}>
            <Button title="Listar Roles" onPress={() => navigation.navigate('RoleList')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10, 
        padding: 10,
        margin: 10,
    }
});
