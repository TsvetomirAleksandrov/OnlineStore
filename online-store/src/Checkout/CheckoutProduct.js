import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckoutProduct({ id, image, title, price, quantity }) {
    const [{ basket, user }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        db.collection('users')
            .doc(user?.uid)
            .collection('cart')
            .doc(`${id}`)
            .delete()

        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

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
                        <Form.Control className='input__field' size="sm" type="text" value={quantity} />
                    <Button className='btn btn-sm' variant="warning" onClick={removeFromBasket}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;



