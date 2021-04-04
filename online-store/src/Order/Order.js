import React from 'react'
import './Order.css'
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import OrdersProduct from './OrdersProduct';

function Order({ order }) {
    console.log('order data', order.data.basket );
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map(item => (
                <OrdersProduct
                    id={item.item.id}
                    title={item.item.title}
                    image={item.item.image}
                    price={item.item.price}
                    quantity={item.item.quantity}
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />   
        </div>
    )
}

export default Order