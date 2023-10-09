import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import authService from '../services/auth.service';

export default function LoginPage() {

    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    const navigation = useNavigation<any>();

    async function signIn() {
        const user = await authService.login(username, password);
        if (user && user.token) {
            navigation.navigate('Home');
        } else {
            Alert.alert('Login / senha inválido(a)!');
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Login: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setUsername(value) }
                />
            </View>

            <View style={{ padding: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Senha: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setPassword(value) }
                    secureTextEntry
                />
            </View>

            <View style={{ padding: 20 }}>
                <Button title=' Entrar ' onPress={signIn} />
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
});
