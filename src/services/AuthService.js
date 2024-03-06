import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post('/login', {email, password})
    }
    static async registration(email, name, phone, password) {
        console.log("Registration data:", { email, name, phone, password });
        return api.post('/signup', { email, name, phone, password });
    }

    static async logout() {
        return api.post('/logout')
    }
}