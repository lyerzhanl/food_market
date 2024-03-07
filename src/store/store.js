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
            const response = await AuthService.registration(email, name, phone, password);
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

    // async isAuthorized() {
    //     try {
    //
    //     }
    // }
}