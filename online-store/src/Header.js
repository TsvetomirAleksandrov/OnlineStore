import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function Header() {
    return (
        <div className='header'>
            <img className='header__logo'
                src='http://kupimed.bg/php_assets/uploads/2017/12/Untitled1.jpg-2048x1736.png' />

            <div className='header__search'>
                <input
                    className='header__searchInput'
                    type='text' />
                <SearchIcon
                    className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                <div className='header__option'>
                    <span
                        className='header__optionLineOne'>Hello Guest
                        </span>
                    <span
                        className='header__optionLineTwo'>Sign In
                        </span>
                </div>

                <div className='header__option'>
                    <span
                        className='header__optionLineOne'>Returns
                        </span>
                    <span
                        className='header__optionLineTwo'>& Orders
                        </span>
                </div>

                <div className='header__option'>
                    <span
                        className='header__optionLineOne'>Your
                        </span>
                    <span
                        className='header__optionLineTwo'>Prime
                        </span>
                </div>

                <div className='header__optionBasket'>
                    <ShoppingBasketIcon />
                </div>
            </div>
        </div>
    );
};

export default Header;