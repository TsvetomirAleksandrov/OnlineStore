import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://i.ibb.co/GnPFbSF/website-0032-Vector-Smart-Object.png' />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant="success" onClick={signIn} className='btn btn-md login__signInButton'>Sign In</Button>
                </Form>

                <p>
                    By signing-in you agree to the KeepHome Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <Button type='submit' onClick={register} className='btn btn-md login__registerButton'>Create your Account</Button>
            </div>
        </div>
    );
};

export default Login;
