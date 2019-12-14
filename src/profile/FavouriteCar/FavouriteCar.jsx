import React, { useEffect, useState } from 'react';
import './FavouriteCar.css';
import userService from '../../services/userService';
import { useHistory } from 'react-router-dom';

function FavouriteCar({ imgUrl, make, model, price, description, gearbox, engine, phoneNumber, userId, id, props }) {

    const history = useHistory();

    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        
        userService.userData(userId).then((data) => {
            setUserInfo(data[0])
        })
    }, {})
    
    const currentValue = id;
    
    
    const delBtn = (e) => {
        e.preventDefault();
        if (userInfo) {
            userInfo.favourite.map((car) => {
                
                if (car._id === e.target.value) {
                    const currentIndex = userInfo.favourite.indexOf(car)                    
                   return userInfo.favourite.splice(currentIndex, 1);
                                        
                }                    
            })
            const data = userInfo;
            userService.favourite(data, userId).then(() => {
                history.push('/profile')
            })
            
        }
        
    }
     

    return (
                

        <div className='product-container'>
            
           
            <img src={imgUrl} alt='logo2' />

            <div className='lit-cont'>
            <p>Make: {make}</p>
            <p>Model: {model}</p>
            <p>Price: {price} lv</p>
            <p>Description: {description}</p>
            <p>Gearbox: {gearbox}</p>
            <p>Engine: {engine}</p>
            <p>Phone number: {phoneNumber}</p>
            <button type='button' value={currentValue} onClick={delBtn}>Delete</button>
            </div>
           

        </div>
)
};

export default FavouriteCar;