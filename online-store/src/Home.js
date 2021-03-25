import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    className='home__image'
                    src='http://kupimed.bg/php_assets/uploads/2017/12/1501494_1387167448204622_1184500433_o-boost.jpg'
                />

                <div className='home__row'>
                    <Product />
                    <Product />
                </div>
                <div className='home__row'>
                    {/* Product */}
                    {/* Product */}
                    {/* Product */}
                </div>
            </div>
        </div>
    );
};

export default Home;
