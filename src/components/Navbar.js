import React, {useContext, useEffect, useState} from 'react';
import {FaShoppingCart} from 'react-icons/fa';
import Order from './Order';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";
import {parse} from "@fortawesome/fontawesome-svg-core";


const showOrders = (props) => {

    let total = 0;
    props.orders.forEach((e) => (total += Number.parseFloat(e.price)));
    return (
        <div>
            {props.orders.map((e) => (
                <Order onDelete={props.onDelete} key={e.id} item={e}/>
            ))}
            <p className="sum">Total: {new Intl.NumberFormat().format(total)} tg</p>
        </div>
    );
};


const showNothing = () => {
    return (
        <div className="empty">
            <h2>There's nothing to see here... yet!</h2>
        </div>
    );
};


const Navbar = (props) => {
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const store = useContext(Context);
    const navigate = useNavigate();
    let [cartOpen, setCartOpen] = useState(false);
    return (
        <nav>
            <div>
                <span className="logo"><Link to="/">Food Store</Link></span>
                <ul className="nav">
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                    {
                        parsedToken
                            ? <li><Link to="/profile">Cabinet</Link></li>
                            : <li><Link to="/login">Cabinet</Link></li>
                    }
                    {
                        store.store.userRole === 'ADMIN' || (parsedToken && parsedToken.role === 'ADMIN')

                            ? <li>
                                <Link to="/admin">Control Panel</Link>
                            </li>
                            : ''
                    }
                    {
                        parsedToken
                            ? <li><Link to="/login" onClick={() => store.store.logout()}>Log Out</Link></li>
                            : ''
                    }

                </ul>
                <FaShoppingCart
                    onClick={() => setCartOpen((cartOpen = !cartOpen))}
                    className={`shop-cart-button ${cartOpen && 'active'}`}
                />

                {cartOpen && (
                    <div className="shop-cart">
                        {props.orders.length > 0 ? showOrders(props) : showNothing()}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default observer(Navbar);
