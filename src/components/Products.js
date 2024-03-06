import React, { useEffect, useState } from 'react';
import img3 from '../img/tomato.png';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This function will be called when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4001/products');
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //   const features = [
  //     { img: img1, title: 'Cabbage', price: 1500, type: 'piece' },
  //     { img: img2, title: 'Potato', price: 140, type: 'kg' },
  //     { img: img3, title: 'Tomato', price: 1000, type: 'kg' },
  //   ];

  return (
    <div className="products">
      <h1 className="header__primary">
        Our <span>Products</span>
      </h1>
      <div className="product-wrapper">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <div className="product-img-wrapper">
              <img src={img3} alt={product.productName} />
            </div>
            <p className="product-title">{product.productName}</p>
            <p className="product-price">
              {product.price + 'tg / '} {product.type}
            </p>
          </div>
        ))}
      </div>
      <button className="view-products">View all Products</button>
    </div>
  );
};

export default Products;
