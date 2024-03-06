import React, {useContext, useEffect, useState} from 'react';
import Users from "../components/admin/users/Users";
import Products from "../components/admin/products/Products";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Admin = (props) => {
    const context = useContext(Context);
    const [activeItem, setActiveItem] = useState('Users')
    const handleItemClick = (item) => {
        setActiveItem(item)
    }
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token)
    useEffect(() => {
        console.log(JSON.parse(token))
    }, []);

    return(
        <div className="admin-wrapper">
            {   parsedToken.role === 'ADMIN'
                ? <><nav className="admin-nav">
                        <div className="nav admin-nav">
                            <ul>
                                <li className={activeItem === 'Users' ? 'active' : ''} onClick={() => handleItemClick('Users')}>
                                    Users
                                </li>
                                <li className={activeItem === 'Products' ? 'active' : ''} onClick={() => handleItemClick('Products')}>
                                    Products
                                </li>
                            </ul>
                        </div>
                    </nav>
                        {activeItem === 'Users' && <Users />}
                        {activeItem === 'Products' && <Products />}</>
                : <h1 className="header__primary">{console.log(context.store.isAuthorized)} Куда прешь малой? </h1>
            }
        </div>
    )
};

export default observer(Admin);