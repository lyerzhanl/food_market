import {makeAutoObservable} from "mobx";
import AdminService from "../services/AdminService";
import Admin from "../pages/Admin";

export default class AdminController {
    allUsers;
    products;
    allCategories;
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

    async getAllCategories() {
        try {
            const response = await AdminService.fetchCategories();
            this.setAllCategories(response);
            console.log(this.allCategories)
        } catch (e) {
            console.log(e);
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

    async createCategory(categoryName) {
        try {
            await AdminService.createCategory(categoryName);
            window.location.reload();
        }catch (e) {
            console.log(e);
        }
    }
    async CreateProduct( productName, categoryId, price, quantity, type, photoUrl ) {
        try {
            await AdminService.createProduct( productName, categoryId, price, quantity, type, photoUrl );
            window.location.reload();
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
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }
    async updateProduct(productId, productName, categoryId, price, quantity, type, photoUrl) {
        try {
            await AdminService.updateProduct(productId, productName, categoryId, price, quantity, type, photoUrl );
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }
    async updateCategory() {
        try {
            await AdminService.updateCategory();
            window.location.reload();
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
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }
    async deleteProduct(productId) {
        try {
            await AdminService.deleteProduct(productId);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteCategory(categoryId) {
        try {
            await AdminService.deleteCategory(categoryId);
            window.location.reload();
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