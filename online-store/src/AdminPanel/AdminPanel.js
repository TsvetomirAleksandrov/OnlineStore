import React, { useState, useEffect } from 'react';
import './AdminPanel.css'
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { Button, Card, CardDeck, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPanel() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection('products').get();
            setProducts(data.docs.map(doc => doc.data()));
        }
        fetchData()
    }, []);

    const onDelete = async (id) => {
        await db.collection('products')
            .doc(`${id}`)
            .delete();

        alert('Item Deleted Successfully!');
        window.location.reload(false);
    }

    return (
        <div className='adminPanel'>
            <h1>Admin Panel</h1>

            <div className='button__container'>
                <Link to='/add'>
                    <Button className='btn btn-lg'>Add item</Button>
                </Link>
            </div>

            <div className='panelList'>
                <h1>Item List</h1>

                <div className='panelList__container'>

                    <CardDeck>
                        <Container>
                            <Row >
                                {products.length > 0 ? (products.map(product => (
                                    <Col sm md lg='auto'>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={product.image} />
                                            <Card.Body >
                                                <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    ${product.price}
                                                </Card.Text>
                                                <Link
                                                    to={{
                                                        pathname: '/Edit',
                                                        state: {
                                                            id: product.id,
                                                            title: product.title,
                                                            price: product.price,
                                                            image: product.image
                                                        }
                                                    }}>
                                                    <Button variant="primary">Edit</Button>
                                                </Link>

                                                <Button className='deleteBtn' variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))) : (<p>No items yet... Please add an item.. 😓</p>)
                                }
                            </Row>
                        </Container>
                    </CardDeck>

                </div >
            </div >
        </div >
    );
};

export default AdminPanel;
