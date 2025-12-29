// src/components/Product.js
import React from 'react';
import './productstyle.css';

const Product = ({ product, addToCart }) => {
    return (
        <div className="product">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
    
};

export default Product;