import { User } from "../dto/user";
import userRepository from "./user.repository";

class AuthService {

    //private readonly url = 'http://192.168.0.19:3030/auth/login';
    private readonly url = 'http://192.168.15.9:3030/auth/login';

    public async login(username: string, password: string) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        
        if (response.status === 201) {
            const logged: User = await response.json();
            await userRepository.setLoggedUser(logged);
            return logged;
        }

        return null;
    }

}

export default new AuthService();