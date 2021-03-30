import React, { useState, useEffect } from 'react';
import './AdminPanel.css'
import { Link } from 'react-router-dom';
import axios from './axios';
import { db } from "./firebase";

function AdminPanel() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection('products').get();
            setProducts(data.docs.map(doc => doc.data()));
        }
        fetchData()
    }, []);

    const initialStateValues = {
        id: Number(''),
        title: '',
        price: Number(''),
        image: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        db
            .collection('products')
            .doc()
            .set({
                id: Number(values.id),
                title: values.title,
                price: Number(values.price),
                image: values.imgURL,
            })

        alert('Product Added Successfully!');
    }


    return (
        <div className='adminPanel'>
            <h1>Admin Panel</h1>
            <Link to='/'>
                <img className='panel__logo' src='http://kupimed.bg/php_assets/uploads/2017/12/Untitled1.jpg-2048x1736.png' />
            </Link>

            <div className='panel__container'>
                <h1>Add Product</h1>

                <form onSubmit={handleSubmit}>
                    <h5>Id</h5>
                    <input type='text' name='id' onChange={handleInputChange} />

                    <h5>Title</h5>
                    <input type='text' name='title' onChange={handleInputChange} />

                    <h5>Price</h5>
                    <input type='text' name='price' onChange={handleInputChange} />

                    <h5>Image Url</h5>
                    <input type='text' name='imgURL' onChange={handleInputChange} />

                    <button type='submit' className='panel__AddButton'>Add</button>
                    {/* <button type='submit' className='panel__EditButton'>Edit</button>
                    <button type='submit' className='panel__DeleteButton'>Delete</button> */}
                </form>
            </div>

            <div className='panelList__container'>
                <h1>Product List</h1>

                <ul>
                    {products.map(product => (
                        <li key={products.id}>{product.title} - {product.price}</li>
                    ))}
                </ul>

            </div>


        </div>
    );
};

export default AdminPanel;
