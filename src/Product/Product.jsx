import React from 'react';
import './product.css';
import { Link } from 'react-router-dom';


class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }
             

        render() {
            
            const { imgUrl, make, model, price, id } = this.props;
           
            
       
            
            return (
                

                <div className='product-container'>
                    
                   
                    <img src={imgUrl} alt='logo2' />
    
                    <div className='lit-cont'>
                    <p>Make: {make}</p>
                    <p>Model: {model}</p>
                    <p>Price: {price} lv</p>
                    <Link to={{pathname:`/details/${id}`}}><button>Details</button></Link>
                    
                    </div>
                   
    
                </div>
        )
        }
    }
        
    

export default Product;