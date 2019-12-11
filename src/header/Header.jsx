import React from 'react';
import Links from './Links/Link'
import './header.css'
import logo from '../images/logo2.gif'

function Header ({ isLogged }) {
    const username = window.localStorage.getItem('username')
    return (
        <div className='header'>
        <ul>
            <img className='logo' src={logo} alt='logo' />
            <div className='left'>
            <Links to='/'>Home</Links>
            <Links>About Us</Links>
            <Links>Contact</Links>
            {isLogged && <Links to='/create'>Create</Links>}
            </div>
            <div className='right'>
            {isLogged && <Links to='/profile'>{username}</Links>}
            {!isLogged && <Links to='/register'>Register</Links>}
            {!isLogged && <Links to='/login'>Login</Links>}
            {isLogged && <Links to='/logout'>Logout</Links>}            
            </div>
        </ul>
    </div>
    )
}

export default Header