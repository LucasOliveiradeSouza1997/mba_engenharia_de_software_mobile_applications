import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { BorderlessButton, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import { User } from '../dto/user';
import userService from '../services/user.service';

export default function UserList() {

    const [ users, setUsers ] = React.useState<User[]>([]);

    const navigation = useNavigation<any>();

    function fetchUsers() {
        userService.getList().then(list => setUsers(list)).catch(error => navigation.goBack());
    }

    React.useEffect(() => fetchUsers(), []);

    function goToEditUser(user: User) {
        navigation.navigate('UserPage', { userId: user.id });
    }

    function removeUser(userId: number) {
        userService.delete(userId)
            .then(saved => fetchUsers())
            .catch(error => Alert.alert(error));
    }

    function DeleteButton({ userId } : any) {
        return (
            <View style={styles.deleteContainer}>
                <BorderlessButton onPress={() => removeUser(userId)} style={styles.deleteButton}>
                    <Text>Delete</Text>
                </BorderlessButton>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={users}
                refreshing={false}
                onRefresh={fetchUsers}
                renderItem={({ item }) => (
                    <GestureHandlerRootView>
                        <Swipeable renderRightActions={() => <DeleteButton userId={item.id} />}>
                            <View style={styles.container} onTouchEnd={() => goToEditUser(item)}>
                                <Text style={styles.text}>Nome: { item.name }</Text>
                                <Text style={styles.text}>Username: { item.username }</Text>
                            </View>
                        </Swipeable>
                    </GestureHandlerRootView>
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
    },
    deleteContainer: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10, 
        height: 60,
    },
    deleteButton: {
        padding: 10,
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent: "center",
    },
});
