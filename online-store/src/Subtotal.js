import React, { useState, useEffect } from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';


function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    const totalPrice = basket.map(b => b.price).reduce((a, c) => a + c);

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                     <strong> {totalPrice}</strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type='checkbox' />This order contains a gift
                 </small>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />

            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Subtotal;
