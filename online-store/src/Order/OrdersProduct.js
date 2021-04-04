import React from 'react';
import './OrdersProduct.css';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrdersProduct({ id, image, title, price, quantity }) {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='button__container'>
                    <Form.Control className='input__field' size="sm" type="text" defaultValue={quantity} />
                </div>
            </div>
        </div>
    );
};

export default OrdersProduct;



