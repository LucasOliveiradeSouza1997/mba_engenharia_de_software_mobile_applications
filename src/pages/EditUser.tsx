import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import userService from '../services/user.service';
import roleService from '../services/role.service';
import { Role } from '../dto/role';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

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

    function fetchUser() {
        if (route.params) {
            const { userId } = route.params as any;
            if (userId) {
                userService.get(userId).then(user => {
                    if (user) {
                        setId(user.id);
                        setName(user.name ? user.name : '');
                        setUsername(user.username);
                        setRoles(user.roles ? user.roles : []);
                    }
                });
            }
        }
    }

    function fetchRoles() {
        roleService.getList().then(roles => {
            setData(roles);
        })
    }

    React.useEffect(() => {
        fetchUser();
        fetchRoles();
    },[]);

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

            <View style={styles.containerMultiple}>
                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={data}
                    labelField="name"
                    valueField="name"
                    placeholder="Selecione uma role"
                    searchPlaceholder="Procurar..."
                    value={roles}
                    onChange={item => {
                        setRoles(item);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color="black"
                            name="Safety"
                            size={20}
                        />
                    )}
                    selectedStyle={styles.selectedStyle}
                />
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
    containerMultiple: { 
        padding: 16,
        width: Dimensions.get('screen').width,
    },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});
