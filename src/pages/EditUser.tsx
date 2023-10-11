import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import userService from '../services/user.service';
import roleService from '../services/role.service';
import { Role } from '../dto/role';

export default function EditUser() {

    const [id, setId] = React.useState<number>();
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [roles, setRoles] = React.useState<string[]>([]);
    const [data, setData] = React.useState<Role[]>([]);

    const navigation = useNavigation<any>();
    const route = useRoute();

    navigation.setOptions({
        headerRight: () =>
            <>
                <Button title="Listar Role" onPress={() => navigation.navigate('RoleList')} />
                <Button title="Cadastrar Role" onPress={() => navigation.navigate('RoleRegister')} />
            </>
    });

    function fetchUser() {
        if (route.params) {
            const { userId } = route.params as any;
            if (userId) {
                userService.get(userId).then(user => {
                    if (user) {
                        setId(user.id);
                        setName(user.name ? user.name : '');
                        setUsername(user.username);
                    }
                });
            }
        }
    }

    function fetchRoles() {
        roleService.getList().then(data => {
            setData(data);
        })
    }

    React.useEffect(() => {
        fetchUser();
        fetchRoles();
    });

    async function save() {
        if (!username || !username.trim()) {
            Alert.alert('O login é obrigatório!');
            return;
        }

        if (id) {
            userService.update({ id, name, username, roles })
                .then(saved => navigation.goBack())
                .catch(error => Alert.alert(error));

        } else {
            if (!password || !password.trim()) {
                Alert.alert('A Senha é obrigatória!');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('As Senhas não conferem!');
                return;
            }

            userService.create({ username, name, password, roles })
                .then(saved => navigation.goBack())
                .catch(error => Alert.alert(error));
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Login: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={value => setUsername(value)} value={username}
                />
            </View>

            <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Nome: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={value => setName(value)} value={name}
                />
            </View>

            <View>
                {data.map((d, index) => (
                    <View key={index}>
                        <Text>Name: {d.id}</Text>
                        <Text>Name: {d.name}</Text>
                        <Text>Description: {d.description}</Text>
                    </View>
                ))}
            </View>

            {!id && (<>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                    <Text style={{ fontSize: 20 }}>Senha: </Text>
                    <TextInput
                        style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                        onChangeText={value => setPassword(value)} value={password}
                        secureTextEntry
                    />
                </View>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                    <Text style={{ fontSize: 20 }}>Confirmar Senha: </Text>
                    <TextInput
                        style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                        onChangeText={value => setConfirmPassword(value)} value={confirmPassword}
                        secureTextEntry
                    />
                </View>
            </>)}

            <View style={{ padding: 20 }}>
                <Button title=' Salvar ' onPress={save} />
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
