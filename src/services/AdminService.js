import api from "../http";

export default class AdminService {
    static async fetchUsers() {
        return api.get('/admin/users')
    }

    static async fetchProducts() {
        return api.get('/products')
    }

    static async fetchHistories() {
        return api.get('/histories')
    }

    static async fetchUser(userId) {
        return api.get(`/profile/${userId}`)
    }

    static async fetchHistoryByUserId(userId) {
        return api.get(`/histories_user/${userId}`)
    }

    static async createCategory(categoryName) {
        return api.post('/create_category', { categoryName })
    }
    static async createProduct( productName, categoryId, price, quantity, type, photoUrl ) {
        return api.post('/create-product', { productName, categoryId, price, quantity, type, photoUrl })
    }
    static async createHistory( productId, userId, quantity ) {
        return api.post('/create_history', { productId, userId, quantity })
    }
    static async updateUser(userId, email, name, phone, role) {
        return api.patch(`/admin/${userId}`, {email, name, phone, role})
    }
    static async updateProduct(productId, productName, categoryId, price, quantity, type, photoUrl) {
        return api.put('/update-product', { productId, productName, categoryId, price, quantity, type, photoUrl })
    }
    static async updateCategory(category) {
        return api.patch('/update_category', { category })
    }
    static async updateHistory(history) {
        return api.patch('/update_history', { history })
    }
    static async deleteUser(userId) {
        return api.delete(`/user/delete/${userId}`)
    }
    static async deleteProduct(productId) {
        return api.delete(`/delete-product/${productId}`)
    }
    static async deleteCategory(categoryId) {
        return api.delete(`/delete_category/${categoryId}`)
    }
    static async deleteHistory(historyId) {
        return api.delete('delete_history', { historyId })
    }
}