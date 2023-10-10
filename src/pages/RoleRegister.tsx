import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import roleService from '../services/role.service';

export default function RoleRegister() {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const navigation = useNavigation<any>();
    const route = useRoute();

    async function register() {

        if (!name || !name.trim()) {
            Alert.alert('O nome da role é obrigatório');
            return;
        }

        if (!description || !description.trim()) {
            Alert.alert('A descrição da role é obrigatório');
            return;
        }

        roleService.create({ name, description })
            .then(saved => navigation.goBack())
            .catch(error => Alert.alert(error));
    }

    return (
        <View style={styles.container}>
           

            <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Nome: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={value => setName(value)} value={name}
                />
            </View>

            <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Descrição: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={value => setDescription(value)} value={description}
                />
            </View>

            <View style={{ padding: 20 }}>
                <Button title=' Registrar ' onPress={register} />
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
