import { User } from "../dto/user";
import userRepository from "./user.repository";

class UserService {

    //private readonly url = 'http://192.168.0.19:3030/users';
    private readonly url = 'http://192.168.15.9:3030/users';

    private async getHeaders() {
        const logged = await userRepository.getLoggedUser();
        if (!logged || !logged.token) throw Error('Sessão inválida!');

        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${logged.token}`
        };
    }

    public async getList(): Promise<User[]> {
        const response = await fetch(this.url, {
            method: 'GET', headers: await this.getHeaders()
        });

        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }

    public async get(id: number): Promise<User | null> {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET', headers: await this.getHeaders()
        });
        
        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }

    public async create(user: User): Promise<User> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(user),
        });
        
        if (response.status === 201) return response.json();

        throw new Error(await response.json());
    }

    public async update(user: User): Promise<User> {
        const response = await fetch(`${this.url}/${user.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(user),
        });
        
        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }

    public async delete(id: number): Promise<User> {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders()
        });
        
        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }

}

export default new UserService();