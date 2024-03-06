import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RenderNav = (props) => {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/login' || location.pathname === '/registration' ? '' : <Navbar onDelete={props.onDelete} orders={props.orders} />}
        </>
    );
};

export default RenderNav;
