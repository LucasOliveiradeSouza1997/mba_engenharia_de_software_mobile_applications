import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../dto/user';

class UserRepository {

    private readonly sessionKey = '@LOGGED_USER';

    public async setLoggedUser(user: User) {
        const json = JSON.stringify(user);
        await AsyncStorage.setItem(this.sessionKey, json);
    }

    public async getLoggedUser() {
        const json = await AsyncStorage.getItem(this.sessionKey);
        if (json) {
            return JSON.parse(json) as User;
        } else {
            return null;
        }
    }

    public async removeLoggedUser() {
        await AsyncStorage.removeItem(this.sessionKey);
    }

}

export default new UserRepository();