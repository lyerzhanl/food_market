import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./store/store";
import AdminController from "./admin/AdminController";

const store = new Store();
const adminController = new AdminController();
export const Context = createContext({
    store,
    adminController,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{adminController, store}}>
        <App />
    </Context.Provider>
);
