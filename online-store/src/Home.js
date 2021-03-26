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
                    <Product title='Kashonche '
                        price={60}
                        image='http://kupimed.bg/php_assets/uploads/2020/12/cropped_kashon.png'
                        rating={5}
                    />
                </div>
                <div className='home__row'>
                    <Product title='Kashonche za '
                        price={60}
                        image='http://kupimed.bg/php_assets/uploads/2020/12/cropped_kashon.png'
                        rating={5}
                    />
                    <Product title='Konsumatori'
                        price={60}
                        image='http://kupimed.bg/php_assets/uploads/2020/12/cropped_kashon.png'
                        rating={5}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
