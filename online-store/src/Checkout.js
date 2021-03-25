import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';

function Checkout() {
    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad' src='http://kupimed.bg/php_assets/uploads/2017/12/1312.jpg'
                />

                <div>
                    <h2 className='checkout__title'>Your shopping Basket</h2>

                    {/* Basket Item */}
                    {/* Basket Item */}
                    {/* Basket Item */}
                    {/* Basket Item */}
                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal />

            </div>
        </div>
    );
};

export default Checkout;
