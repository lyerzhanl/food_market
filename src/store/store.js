import {makeAutoObservable, reaction} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import {Navigate} from "../helpers/Navigate";


export default class Store {
    userData;
    isAuthorized = false;
    userRole = '';

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuthorized(auth) {
        this.isAuthorized = auth;
    }

    setUserData(user) {
        this.userData = user
    }
    setUserRole(role) {
        this.userRole = role;
    }

    isAuthorizedReaction = reaction(
        () => this.isAuthorized,
        (isAuthorized) => {
            if (isAuthorized) {
                console.log('authorized :' , isAuthorized)
            } else {
                console.log('Not authenticated:', isAuthorized);
            }
        }
    );

    async login(email, password){
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', JSON.stringify(response.data));
            this.setUserData(response);
            this.setIsAuthorized(true);
            this.setUserRole(response.data.role)
            console.log('token: ', localStorage.getItem('token'))
        } catch (e) {
            console.log('Ошибка в store.js : ', e);
        }
    }




    async registerUser(email, name, phone, password){
        try {
            console.log('registerge kirdi')
            const response = await AuthService.registration(email, name, phone, password);
            console.log('kerek jer ', response)
        } catch (e) {
            console.log('Ошибка в store.js : ', e)
        }
    }

    async logout(){
        try {
            await AuthService.logout();
            localStorage.removeItem('token')
            this.setIsAuthorized(false)
            this.setUserData({})
            window.location.reload();
        } catch (e) {
            console.log('Ошибка в store.js : ', e)
        }
    }

    // async checkAuth() {
    //     try {
    //         const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
    //         localStorage.setItem('token', this.userData)
    //         this.setAuth(true)
    //         this.setUserData(response)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}