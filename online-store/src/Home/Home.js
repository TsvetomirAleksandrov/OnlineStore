import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from '../Product/Product';
import { db } from '../firebase'
import { AnimationWrapper } from 'react-hover-animation'
import { CardDeck, Container, Row, Col } from 'react-bootstrap';


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('products').get();
      console.log(data);
      setProducts(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://i.ibb.co/wrMLWYK/website-0035-background-blue-close-up-298695.png'
        />

        <div className="home__row">
          {products.map(product => (
            <AnimationWrapper>
              <CardDeck>
                <Container>
                  <Row >
                    <Product
                      id={product.id}
                      title={product.title}
                      price={Number(product.price)}
                      image={product.image}
                    />
                  </Row>
                </Container>
              </CardDeck>
            </AnimationWrapper>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
