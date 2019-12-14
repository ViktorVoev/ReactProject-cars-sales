import React from 'react';
import Products from '../Product/Product';
import './home.css';
import carService from '../services/car-service';
import { Link } from 'react-router-dom';






class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cars: null
        };
    }
    
        componentDidMount() {
    
            carService.getCars().then((cars) => {
                
                this.setState({ cars })
            })

    
        }
    
        

   
    render() {
        const { cars } = this.state;
        const { isLogged } = this.props
        
        
        
       return ( 
        
        <div className='home'>
        
        {isLogged ? (cars ?
          <div className="cars">
            {cars.map((car) =>
              <Products key={car._id} imgUrl={car.imgUrl} make={car.make} model={car.model} price={car.price} description={car.description} id={car._id} creator={car.creator}></Products>)}
          </div> : <div><h1>Loading ...</h1></div>
          ) : <div>
              <h1>Welcome to our site for car selling. If you want to continuous must login first.</h1>
            <Link to='/login'><button>Login</button></Link>
              <br />
              <br />
              <iframe title='comingvideo' width="420" height="315"
                src="https://www.youtube.com/embed/uh8lG5fugIo?playlist=tgbNymZ7vqY&loop=1"></iframe>
          </div>
        }
       
      </div>
      
      
      
       )
       
      
    
    }
        
                
}

export default Home;