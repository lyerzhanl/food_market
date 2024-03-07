import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const store = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="auth-box">
            <div className="auth-form-outer">
                <div className="auth-form-wrapper">
                    <h2 className="header__primary">Hello! You've Been Searched!</h2>
                    <div className="auth-inputBox">
                        <input type="text" required="required" onChange={e => setEmail(e.target.value)} value={email}/>
                        <span className={email === '' ? '' : 'active'}>E-Mail</span>
                        <i></i>
                    </div>
                    <div className="auth-inputBox">
                        <input type="password" required="required"
                               onChange={e => setPassword(e.target.value)} value={password}/>
                        <span className={password === '' ? '' : 'active'}>Password</span>
                        <i></i>
                    </div>
                    <div className="auth-links">
                        <Link to="" onClick="">Forgot your password?</Link>
                        <Link to="/registration">Create account</Link>
                    </div>
                    <input className="log-submit" type="submit" value="Login"
                           onClick={() => {
                               store.store.login(email, password)
                               navigate('/')}}/>
                    <div className="auth-links-2">
                        <Link to="/">Back to main page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default observer(LogIn);