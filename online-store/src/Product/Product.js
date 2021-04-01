import React from 'react';
import './Product.css';
import { useStateValue } from '../StateProvider';
import { Button, Card, CardDeck, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product({ id, title, image, price, rating }) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch the item into the Data Layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
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
