import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Role } from '../dto/role';
import roleService from '../services/role.service';

export default function Home() {

    const [roles, setRoles] = React.useState<Role[]>([]);

    const navigation = useNavigation<any>();

    function fetchRoles() {
        roleService.getList().then(list => setRoles(list)).catch(error => navigation.goBack());
    }

    React.useEffect(() => fetchRoles(), []);

    return (
        <View>
            <FlatList
                data={roles}
                refreshing={false}
                onRefresh={fetchRoles}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.text}>ID: {item.id}</Text>
                        <Text style={styles.text}>Nome: {item.name}</Text>
                        <Text style={styles.text}>Descrição: {item.description}</Text>
                    </View>

                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10, 
        padding: 10,
        margin: 10,
    },
    text: {
        fontSize: 20
    }
});
