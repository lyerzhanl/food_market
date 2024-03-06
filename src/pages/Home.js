import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';
import Products from '../components/Products';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Reviews from '../components/Reviews';

const Home = ({ chooseCategory, items, onAdd }) => (
    <>
        <Header />
        <Features />
        <Products />
        <Categories chooseCategory={chooseCategory} />
        <Items items={items} onAdd={onAdd} />
        <Reviews />
    </>
);

export default Home;
