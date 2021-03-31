import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './Product';
import { db } from './firebase'

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('products').get();
      setProducts(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='http://kupimed.bg/php_assets/uploads/2017/12/1501494_1387167448204622_1184500433_o-boost.jpg'
        />

        <div className="home__row">
          {products.map(product => (
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              rating={5}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
