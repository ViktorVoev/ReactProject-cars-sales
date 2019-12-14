import React from 'react';
import './About.css';
import logo from '../images/logo2.gif';

function About() {
    return (
        <div className='about'>
            <img src={logo} alt='logo' />

            <h2>Hi, we are from the Cars-sales's team!</h2>
            <p>We start our project 5 years ago, because feel need for something which is simple and effective to use. Hope this product
                would like you. Enjoy it !!!
            </p>
        </div>


    )
}

export default About;