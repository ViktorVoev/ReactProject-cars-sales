import React from 'react';
import './details.css';
import carService from '../../services/car-service';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import { array } from 'yup';

class Details extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            car: {},
            user: {}
        }
    }
             
    componentDidMount() {
        const carId = this.props.location.pathname.split('/')[2];
        const userId = JSON.parse(window.localStorage.getItem('userId'));
        carService.details(carId).then((car) => {
            this.setState({ 
                car: car[0]
             })
        })

        userService.userData(userId).then((user) => {
            this.setState({
                user:user[0]
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

    favouriteButn = (e) => {
        e.preventDefault();
        const userId = JSON.parse(window.localStorage.getItem('userId'));
        const currentCar = this.state.car;
        const favouriteCars = this.state.user.favourite;
        favouriteCars.push(currentCar);
        const result = Array.from(new Set(favouriteCars.map(s => s._id)))
        .map(id => {
            return {
                _id: id,
                imgUrl: favouriteCars.find(s => s._id === id).imgUrl,
                make: favouriteCars.find(s => s._id === id).make,
                model: favouriteCars.find(s => s._id === id).model,
                price: favouriteCars.find(s => s._id === id).price,
                description: favouriteCars.find(s => s._id === id).description,
                creator: favouriteCars.find(s => s._id === id).creator,
                gearbox: favouriteCars.find(s => s._id === id).gearbox,
                engine: favouriteCars.find(s => s._id === id).engine,
                phoneNumber: favouriteCars.find(s => s._id === id).phoneNumber,
            }
        })
        this.state.user.favourite = result.slice();      
        const data = this.state.user;
        userService.favourite(data, userId).then(() => {
            this.props.history.push('/')
        })
    }


        render() {

                        
            const { imgUrl, make, model, price, description, creator, gearbox, engine, phoneNumber, _id } = this.state.car;
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
                    <p>Engine: {engine} </p>
                    <p>Phone Number: {phoneNumber} </p>
                    {userId === creator ? 
                    <div className='lit-con-btn'>
                        <Link to={{pathname:`/edit/${_id}`}}><button>Edit</button></Link>
                        <Link to={{pathname:`/delete/${_id}`}}><button type='button' onClick={this.deleteButn}>Delete</button></Link> 
                        <Link to={{pathname:`/favourite/${_id}`}}><button type='button' onClick={this.favouriteButn}>Favourite</button></Link> 
                    </div> : <div className='lit-con-btn'><Link to={{pathname:`/favourite/${_id}`}}><button type='button' onClick={this.favouriteButn}>Favourite</button></Link> </div>}
                        
                     
                   
                    
                    </div>
                   
                      
                </div>
    
        )
        }
    }
        
    

export default Details;