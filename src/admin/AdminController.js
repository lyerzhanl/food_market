import {makeAutoObservable} from "mobx";
import AdminService from "../services/AdminService";
import Admin from "../pages/Admin";

export default class AdminController {
    allUsers;
    products;
    allCategories = [];
    histories = [];
    history = {};
    singleUser = {};

    constructor() {
        makeAutoObservable(this);
    }

    setAllUsers(allUsers) {
        this.allUsers = allUsers;
    }

    setAllCategories(categories) {
        this.allCategories = categories;
    }

    setProducts(products) {
        this.products = products;
    }

    setHistories(histories) {
        this.histories = histories;
    }

    setSingleUser(user) {
        this.singleUser = user;
    }
    setHistory(history) {
        this.history = history;
    }

    async getAllUsers() {
        try {
            const response = await AdminService.fetchUsers();
            this.setAllUsers(response);
        }catch (e) {
            console.log(e)
        }
    }
    async getAllProducts() {
        try {
            const response = await AdminService.fetchProducts();
            console.log('allProducts from server: ', response)
            this.setProducts(response.data);
        }catch (e) {
            console.log(e)
        }
    }
    async getAllHistories() {
        try {
            const response = await AdminService.fetchHistories();
            this.setAllUsers(response);
        }catch (e) {
            console.log(e)
        }
    }
    async getSingleUser() {
        try {
            const response = await AdminService.fetchUser();
            this.setSingleUser(response);
        }catch (e) {
            console.log(e)
        }
    }

    async getHistoryByUserId() {
        try {
            const response = await AdminService.fetchHistoryByUserId();
            this.setHistory(response);
        } catch (e) {
            console.log(e);
        }
    }

    async createCategory() {
        try {
            await AdminService.createCategory();
        }catch (e) {
            console.log(e);
        }
    }
    async CreateProduct( productName, categoryId, price, quantity, type, photoUrl ) {
        try {
            await AdminService.createProduct( productName, categoryId, price, quantity, type, photoUrl );
        } catch (e) {
            console.log(e)
        }
    }
    async createHistory() {
        try {
            await AdminService.createHistory();
        }catch (e) {
            console.log(e);
        }
    }

    async updateUser(userId, email, name, phone, role) {
        try {
            await AdminService.updateUser(userId, email, name, phone, role);
        } catch (e) {
            console.log(e);
        }
    }
    async updateProduct(productId, productName, categoryId, price, quantity, type, photoUrl) {
        try {
            await AdminService.updateProduct(productId, productName, categoryId, price, quantity, type, photoUrl );
        } catch (e) {
            console.log(e);
        }
    }
    async updateCategory() {
        try {
            await AdminService.updateCategory();
        }catch (e) {
            console.log(e);
        }
    }
    async updateHistory() {
        try {
            await AdminService.updateHistory();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(userId) {
        try {
            await AdminService.deleteUser(userId);
        } catch (e) {
            console.log(e);
        }
    }
    async deleteProduct() {
        try {
            await AdminService.deleteProduct();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteCategory() {
        try {
            await AdminService.deleteCategory();
        } catch (e) {
            console.log(e);
        }
    }
    async deleteHistory() {
        try {
            await AdminService.deleteHistory();
        } catch (e) {
            console.log(e);
        }
    }
}