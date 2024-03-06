import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import Cabinet from './pages/Cabinet';
import Contacts from './pages/Contacts';
import RenderFooter from './helpers/RenderFooter';
import RenderNav from './helpers/RenderNav';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Admin from './pages/Admin';
import {observer} from 'mobx-react-lite';
import {Context} from "./index";

const App = () => {
    const [orders, setOrders] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [serveritems, setServeritems] = useState([]);
    const [serverCategories, setServerCategories] = useState([]);
    const store = useContext(Context);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:4001/categories').then((response) => response.json()),
            fetch('http://localhost:4001/products').then((response) => response.json()),
        ])
            .then(([categories, products]) => {
                console.log('categories: ', categories, '\n products: ', products)
                setServeritems(products);
                setCurrentItems(products);
                setServerCategories(categories);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [store]);

    const chooseCategory = (categoryId) => {
        if (categoryId === 0) {
            setCurrentItems(serveritems);
            return;
        }
        const filteredItems = serveritems.filter((item) => item.categoryId === categoryId);
        setCurrentItems(filteredItems);
    };

    const deleteOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((e) => e.ID !== id));
    };

    const addToOrder = (item) => {
        const isInArray = orders.some((e) => e.ID === item.ID);
        if (!isInArray) {
            setOrders((prevOrders) => [...prevOrders, item]);
        }
    };

    return (
        <div className="wrapper">
            <Router>
                <RenderNav onDelete={deleteOrder} orders={orders} />
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Home
                                chooseCategory={chooseCategory}
                                items={currentItems}
                                onAdd={addToOrder}
                            />
                        }
                    />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/registration" element={<Register />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile/" element={<Cabinet />} />
                </Routes>
                <RenderFooter />
            </Router>
        </div>
    );
};

export default observer(App);
