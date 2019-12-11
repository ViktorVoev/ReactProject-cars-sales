import React from 'react';
import './details.css';
import carService from '../../services/car-service';
import { Link } from 'react-router-dom';

class Details extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            car: {}
        }
    }
             
    componentDidMount() {
        const carId = this.props.location.pathname.split('/')[2];
        carService.details(carId).then((car) => {
            this.setState({ 
                car: car[0]
             })
        })

    }

    deleteButn = (e) => {
        e.preventDefault();
        const carId = this.props.location.pathname.split('/')[2];
        carService.delete(carId).then(() => {
            this.props.history.push('/')
        })
    }


        render() {

                        
            const { imgUrl, make, model, price, description, creator, gearbox, _id } = this.state.car;
            const userId = window.localStorage.getItem('userId');
            
            return (
                
           
                <div className='details-container'>

                    <img src={imgUrl} alt='logo2' />
    
                    <div className='lit-det-cont'>
                    <p>Make: {make}</p>
                    <p>Model: {model}</p>
                    <p>Price: {price} lv</p>
                    <p>Description: {description}</p>
                    <p>Gearbox: {gearbox} </p>
                    {userId === creator ? 
                    <div>
                        <Link to={{pathname:`/edit/${_id}`}}><button >Edit</button></Link>
                        <Link to={{pathname:`/delete/${_id}`}}><button type='button' onClick={this.deleteButn}>Delete</button></Link> 
                    </div> : <div></div>}
                        
                     
                   
                    
                    </div>
                   
                      
                </div>
    
        )
        }
    }
        
    

export default Details;