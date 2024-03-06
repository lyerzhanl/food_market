import React from 'react';
import Navbar from './Navbar';
export default function Header(props) {
  return (
    <>
      <header>
        <div className="presentation">
          <button className="hero-shop-button">Shop Now</button>
        </div>
      </header>
    </>
  );
}

// {props.orders.map((e) => (
//   <Order key={e.id} item={e} />
// ))}
