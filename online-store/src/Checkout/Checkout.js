import React, { useEffect, useState } from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct.js';
import { useStateValue } from '../StateProvider';
import Subtotal from './Subtotal';
import FlipMove from 'react-flip-move';

function Checkout({ cartItems, getTotalQuantity, getTotalPrice }) {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>

                <div>
                    <h2 className='checkout__title'>Shopping Cart:</h2>
                    {cartItems.map(item => (
                        <CheckoutProduct
                            id={item.item.id}
                            title={item.item.title}
                            image={item.item.image}
                            price={item.item.price}
                            quantity={item.item.quantity}
                        />
                    ))}
                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal getTotalPrice={getTotalPrice} getTotalQuantity={getTotalQuantity} />
            </div>
        </div>
    );
};

export default Checkout;
