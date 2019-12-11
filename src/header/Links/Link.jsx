import React from 'react';
import { Link as ReactRouterDomLink  } from 'react-router-dom';
import './Link.css'

function Link({ children, to }) {
    return (
    <li className='header-link'>
        <ReactRouterDomLink to={to}>{children}</ReactRouterDomLink> 
        </li>
    )
}

export default Link