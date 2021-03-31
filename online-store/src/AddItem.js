import React, { useState, useEffect } from 'react';
import './AdminPanel.css'
import { useHistory } from 'react-router-dom';
import { db } from "./firebase";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddItem() {
    const history = useHistory();
    const initialStateValues = {
        id: Number(''),
        title: '',
        price: Number(''),
        image: ''
    };

    const [values, setValues] = useState(initialStateValues);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection('products').get();
            setProducts(data.docs.map(doc => doc.data()));
        }
        fetchData()
    }, []);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const onCreate = (e) => {
        e.preventDefault();

        db.collection('products')
            .doc(values.id)
            .set({
                id: Number(values.id),
                title: values.title,
                price: Number(values.price),
                image: values.image,
            })

        alert('Product Added Successfully!');
        history.replace('/admin');
    }

    return (
        <div className='adminPanel'>
            <h1>Add item</h1>

            <div className='panel__container'>
                <Form onSubmit={onCreate}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" name='id' onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name='title' onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name='price' onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control type="text" name='image' onChange={handleInputChange} />
                    </Form.Group>
                    <Button className='btn btn-lg' type='submit'>Add</Button>
                </Form>
            </div>
        </div >
    );
};

export default AddItem;
