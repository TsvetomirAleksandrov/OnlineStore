import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from '../axios';
import { db } from "../firebase";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Payment({ cartItems, getTotalPrice, getTotalQuantity }) {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders');
        })

    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{getTotalQuantity()} items</Link>
                        )
                </h1>

                {/* Payment section - delivery address
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div> */}

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items</h3>
                    </div>
                    <div className='payment__items'>
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

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getTotalPrice()}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <Button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </Button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;