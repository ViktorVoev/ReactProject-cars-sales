import React from 'react';
import './Edit.css';
import carService from '../../services/car-service';

class Create extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            imgUrl: '',
            make: '',
            model: '',
            price: '',
            description: '',
            gearbox: '',
            phoneNumber: '',
            engine: '',
            creator: window.localStorage.getItem('userId'),
            car: {}
        }
    }
   

    changeMake = (e) => {
        this.setState({
            make: e.target.value.toUpperCase()
        })
    }; 

    changeModel = (e) => {
        this.setState({
            model: e.target.value.toUpperCase()
        })
    }; 

    changePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }; 

    changeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }; 

    changeImgUrl = (e) => {
        this.setState({
            imgUrl: e.target.value
        })
    }; 

    changeEngine = (e) => {
        this.setState({
            engine: e.target.value
        })
    };

    changePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }; 


    changeGearbox = (e) => {
        this.setState({
            gearbox: e.target.value
        })
    }; 

    componentDidMount() {
        const carId = this.props.location.pathname.split('/')[2];
        carService.details(carId).then((car) => {
            this.setState({ 
                imgUrl: car[0].imgUrl,
                make: car[0].make,
                model: car[0].model,
                price: car[0].price,
                description: car[0].description,
                gearbox: car[0].gearbox,
                phoneNumber: car[0].phoneNumber,
                engine: car[0].engine
             });
        });
    };

    submitBtn = (e) => {
        e.preventDefault();
        const data = this.state
        const carId = this.props.location.pathname.split('/')[2];
        carService.update(data, carId).then(() => {
            this.props.history.push(`/details/${carId}`)
        })


    }

    
    render() {
        const { imgUrl, make, model, price, description, gearbox, engine, phoneNumber } = this.state;
        
        
        
        return (
            <form className='edit-ad'>

                <div className='edit'>
                <label>ImageUrl:</label>
                <input type="text" value={imgUrl} onChange={this.changeImgUrl} id="imgUrl" />
                </div>

                <div className='edit'>
                <label>Make:</label>
                <input type="text" value={make} onChange={this.changeMake} id="make" />
                </div>

                <div className='edit'>
                <label>Model:</label>
                <input type="text" value={model} onChange={this.changeModel} id="model" />
                </div>

                <div className='edit'>
                <label>Price:</label>
                <input type="number" value={price} onChange={this.changePrice} id="price" />
                </div>

                <div className='edit'> 
                <label>Description:</label>
                <input type="text" value={description} onChange={this.changeDescription} id="description" />
                </div>

                <div className='edit'> 
                    <label>Phone Number:</label>
                    <input type="text" value={phoneNumber} onChange={this.changePhoneNumber} id="phoneNumber" />
                    </div>

                    <div className='edit'>
                    <div className='edit-chek'> 
                        <label htmlFor='gearbox'>Gearbox:</label>
                        <select id='gearbox' className='edit' onChange={this.changeGearbox} value={gearbox}>
                            <option value=''>Choose...</option>
                            <option value='Manual'>Manual</option>
                            <option value='Automatic'>Automatic</option>
                        </select>
                    </div>

                    <div className='edit-chek'> 
                        <label htmlFor='engine'>Gearbox:</label>
                        <select id='engine' className='edit' onChange={this.changeEngine} value={engine}>
                            <option value=''>Choose...</option>
                            <option value='Diesel'>Diesel</option>
                            <option value='Petrol'>Petrol</option>
                            <option value='Hybrid'>Hybrid</option>
                            <option value='Electric'>Electric</option>

                        </select>
                    </div>
                    </div>
                
                <button className='edit-btn' type='button' onClick={this.submitBtn}>Edit</button>
            </form>
        )
    }
}

export default Create;