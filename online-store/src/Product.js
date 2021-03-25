import React from 'react';
import './Product.css';

function Product() {
    return (
        <div className='product'>
            <div className='product__info'>
                <p>The lean startup</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>19.99</strong>
                </p>
                <div className='product__rating'>
                    <p>⭐</p>
                </div>
            </div>
            <img
                src='http://kupimed.bg/php_assets/uploads/2020/12/cropped_kashon.png'
            />

            <button>Add to Basket</button>
        </div>
    );
};

export default Product;
