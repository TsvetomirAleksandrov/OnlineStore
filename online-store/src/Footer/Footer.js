import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer id='footer'>
            <div className='empty-container'></div>
            <div className='container'>
                <a href='#'><p className='footer__text'>Privacy Policy</p></a>
                <a href='#'><p className='footer__text'>Terms of Use</p></a>
            </div>

        </footer>

    );
};

export default Footer;
