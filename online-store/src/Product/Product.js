import React from 'react';
import './Product.css';
import { useStateValue } from '../StateProvider';
import { Button, Card, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebase';

function Product({ id, title, image, price, rating }) {
    const [{ basket, user }, dispatch] = useStateValue();

    const addToBasket = () => {
        const cartItem = db.collection('users')
            .doc(user?.uid)
            .collection('cart')
            .doc(`${id}`);

        cartItem.get()
            .then((doc) => {
                if (doc.exists) {
                    cartItem.update({
                        item: {
                            id: id,
                            title: title,
                            image: image,
                            price: price,
                            quantity: doc.data().item.quantity + 1,
                        }
                    })
                } else {
                    db.collection('users')
                        .doc(user?.uid)
                        .collection('cart')
                        .doc(`${id}`)
                        .set({
                            item: {
                                id: id,
                                title: title,
                                image: image,
                                price: price,
                                quantity: 1,
                            }
                        });
                }

            })

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
            }
        });
    };

    return (
        <Col >
            <Card>
                <Card.Img variant="top" className='product__image' src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        ${price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className='btn btn-md' variant="success" onClick={addToBasket}>Add to Basket</Button>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default Product;
