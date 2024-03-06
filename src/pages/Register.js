import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Navigate} from "../helpers/Navigate";

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const store = useContext(Context);
    const navigate = useNavigate();

    const handleRegister = () => {
        store.store.registerUser(email, name, phone, password)
        navigate('/login')
    }

    return(
        <div className="auth-box">
            <div className="auth-form-outer">
                <div className="auth-form-wrapper">
                    <h2 className="header__primary">Wanna break from the ads?</h2>
                    <div className="auth-inputBox">
                        <input type="text" required="required" onChange={e => setName(e.target.value)} value={name}/>
                        <span className={name === '' ? '' : 'active'}>Name</span>
                        <i></i>
                    </div>
                    <div className="auth-inputBox">
                        <input type="text" required="required" onChange={e => setEmail(e.target.value)} value={email}/>
                        <span className={email === '' ? '' : 'active'}>E-Mail</span>
                        <i></i>
                    </div>
                    <div className="auth-inputBox">
                        <input type="text" required="required"
                               onChange={e => setPhone(e.target.value)} value={phone}/>
                        <span className={phone === '' ? '' : 'active'}>Phone</span>
                        <i></i>
                    </div>
                    <div className="auth-inputBox">
                        <input type="password" required="required" onChange={e => setPassword(e.target.value)}
                               value={password}/>
                        <span className={password === '' ? '' : 'active'}>Password</span>
                        <i></i>
                    </div>
                    <div className="auth-inputBox">
                        <input type="password" required="required" onChange={e => setRepeatPassword(e.target.value)}
                               value={repeatPassword}/>
                        <span className={repeatPassword === '' ? '' : 'active'}>Retype Password</span>
                        <i></i>
                    </div>
                    <div className="auth-links">
                        <Link to="" onClick="">Forgot your password?</Link>
                        <Link to="/login">Already have an account?</Link>
                    </div>
                    <input className="log-submit" type="submit" value="Login"
                           onClick={handleRegister}/>
                    <div className="auth-links-2">
                        <Link to="/">Back to main page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default observer(Register);