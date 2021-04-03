import React from 'react';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { Form, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ cartItems }) {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth
                .signOut();
        }
    }

    const getCount = () => {
        let count = 0;
        cartItems.forEach((item) => {
            count += item.item.quantity;
        })

        return count;
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link className='text-link' to='/'>
                <img className='header__logo'
                    src='https://i.ibb.co/GnPFbSF/website-0032-Vector-Smart-Object.png' />
            </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href={!user && '/login'}>
                        <div onClick={handleAuthentication} className='header__option'>
                            <span
                                className='header__optionLineOne'>Hello, {user ? user.email : `Guest`}
                            </span>
                            <span
                                className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}
                            </span>
                        </div>
                    </Nav.Link>
                    <Nav.Link href="/admin">
                        {user ?
                            <div className='header__option'>
                                <span
                                    className='header__optionLineOne'>Admin
                        </span>
                                <span
                                    className='header__optionLineTwo'>Panel
                        </span>
                            </div>
                            : ('')}
                    </Nav.Link>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/orders">{user ? ('My Orders') : ('')}</Nav.Link>
                </Nav>
                <Form inline>
                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            <ShoppingBasketIcon />
                            <span className="header__optionLineTwo header__basketCount">
                                {getCount()}
                            </span>
                        </div>
                    </Link>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
