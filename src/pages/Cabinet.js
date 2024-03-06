import React from 'react';
import ava from './../img/profile.webp';

function Cabinet(props) {
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    return (
        <div className="profile-outer">
            <div className="profile-img">
                {/*<img src={ava} alt={parsedToken.userId}/>*/}
            </div>
            <div className="profile-name">
                <h1 className="header__primary">
                    Name : {parsedToken.name}
                </h1>
            </div>
            <div className="profile-email">
                <p className="email">
                    Your E-Mail: {parsedToken.email}
                </p>
            </div>
            <div className="profile-phone">
                <p className="phone">
                    Your Phone: {parsedToken.phone}
                </p>
            </div>
        </div>
    );
}

export default Cabinet;