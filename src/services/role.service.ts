import { Role } from "../dto/role";
import userRepository from "./user.repository";

class RoleService {

    //private readonly url = 'http://192.168.0.19:3030/users';
    private readonly url = 'http://192.168.15.9:3030/roles';

    private async getHeaders() {
        const logged = await userRepository.getLoggedUser();
        if (!logged || !logged.token) throw Error('Sessão inválida!');

        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${logged.token}`
        };
    }

    public async getList(): Promise<Role[]> {
        const response = await fetch(this.url, {
            method: 'GET', headers: await this.getHeaders()
        });

        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }

    public async create(role: Role): Promise<Role> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(role),
        });
        
        if (response.status === 201) return response.json();

        throw new Error(await response.json());
    }
}

export default new RoleService();