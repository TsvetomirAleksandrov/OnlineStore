import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Edit.css';
import { db } from "./firebase";

function Edit() {
    const { state } = useLocation();
    const history = useHistory();

    const initialStateValues = {
        id: Number(state.id),
        title: state.title,
        price: Number(state.price),
        image: state.image
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const onUpdate = (e) => {
        e.preventDefault();
        const id = state.id;

        db.collection('products')
            .doc(`${id}`)
            .set({
                id: Number(state.id),
                title: values.title,
                price: Number(values.price),
                image: values.image,
            });

        alert('Product Updated Successfully!');
        history.replace('/admin');
    }

    return (
        <div className='edit'>
            <h1>Edit item</h1>

            <div className='panel__container'>
                <Form onSubmit={onUpdate}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="id" value={state.id} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name='title' defaultValue={state.title} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name='price' defaultValue={state.price} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control type="text" name='image' defaultValue={state.image} onChange={handleInputChange} />
                    </Form.Group>
                    <Button className='btn btn-lg' type='submit'>Update</Button>
                </Form>
            </div>
        </div>
    );
};

export default Edit;
