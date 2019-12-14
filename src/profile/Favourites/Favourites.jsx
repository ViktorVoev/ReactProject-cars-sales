import React from 'react';
import userService from '../../services/userService';
import FavouriteCar from '../FavouriteCar/FavouriteCar';
import { Link } from 'react-router-dom';
import './Favourites.css'


class Favourites extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cars: {}
        }
    }

    componentDidMount() {
        const userId = JSON.parse(window.localStorage.getItem('userId'));       
        userService.userData(userId).then((data) => {
            this.setState({ cars: data[0] })
        });
    };


render() {    
    
    const { favourite } = this.state.cars;
   
    
    return (
    <div className='favourite'>
      <div>
            {favourite ? <div>{favourite.map((car) => 
                <FavouriteCar 
                                key={car._id}
                                userId={this.state.cars._id}
                                imgUrl={car.imgUrl} 
                                make={car.make} 
                                model={car.model} 
                                price={car.price} 
                                description={car.description} 
                                id={car._id} 
                                gearbox={car.gearbox} 
                                engine={car.engine} 
                                props={this.props}
                                phoneNumber={car.phoneNumber
                                } />
                
                )}
                </div> : <div><h1>Loading ...</h1></div>}
        </div>

                <Link to='/profile'><button>Back</button></Link>
    </div>
    )
    }
}

export default Favourites;

