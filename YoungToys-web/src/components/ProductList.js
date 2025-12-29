// src/components/ProductList.js
import React from 'react';
import './productstyle.css';
import { FaRegHeart } from "react-icons/fa";

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-details">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <div class="row">
                        <div class="col-8">
                        <button class="rounded-3 d-grid ms-auto col-6">Coming Soon</button>
                        </div>
                            <div class="col-4 text-start"><FaRegHeart /></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
