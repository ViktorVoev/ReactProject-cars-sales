import React from 'react';
import Links from './Links/Link'
import './header.css'
import logo from '../images/logo2.gif';


class Header extends React.Component {

    

    render() {
        
        const username = window.localStorage.getItem('username');
        const { isLogged } = this.props;


        return (
            <div className='header'>
            <ul>
                <img className='logo' src={logo} alt='logo' />
                <div className='left'>
                <Links to='/'>Home</Links>
                <Links to='/about'>About Us</Links>
                <Links to='/contact'>Contact</Links>
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
}; 

export default Header