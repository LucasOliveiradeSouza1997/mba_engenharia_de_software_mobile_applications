import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { Role } from '../dto/role';
import roleService from '../services/role.service';

export default function Home() {

    const [roles, setRoles] = React.useState<Role[]>([]);

    const navigation = useNavigation<any>();

    navigation.setOptions({
        headerLeft: () => <Button title="Voltar" onPress={() => navigation.goBack()} />,
    });

    function fetchRoles() {
        roleService.getList().then(list => setRoles(list)).catch(error => navigation.goBack());
    }

    React.useEffect(() => fetchRoles(), []);

    return (
        <View style={styles.container}>
            <FlatList
                data={roles}
                refreshing={false}
                onRefresh={fetchRoles}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.id} - {item.name} - {item.description}</Text>
                    </View>

                )}
            />
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
    item: {
        height: 50,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
    },
    text: {
        fontSize: 20
    },
    deleteContainer: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
    },
    deleteButton: {
        padding: 10,
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent: "center",
    },
});
