import React from 'react';
import {useLocation} from "react-router-dom";
import Footer from "../components/Footer";

const RenderFooter = (props) => {
    const location = useLocation();
    return(
        <>
            {location.pathname === '/login' || location.pathname === '/registration' ? '' : <Footer />}
        </>
    )
};

export default RenderFooter;