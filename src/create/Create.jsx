    import React from 'react';
    import './create.css';
    import carService from '../services/car-service'

    class Create extends React.Component {
        constructor(props){
            super(props)

            this.state = {
                imgUrl: '',
                make: '',
                model: '',
                price: '',
                description: '',
                phoneNumber: '',
                gearbox: '',
                engine: '',
                creator: window.localStorage.getItem('userId')
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

        changePhoneNumber = (e) => {
            this.setState({
                phoneNumber: e.target.value
            })
        }; 

        changeImgUrl = (e) => {
            this.setState({
                imgUrl: e.target.value
            })
        }; 

        changeGearbox = (e) => {
            this.setState({
                gearbox: e.target.value
            })
        }; 

        changeEngine = (e) => {
            this.setState({
                engine: e.target.value
            })
        };

        submitBtn = (e) => {
            e.preventDefault();
            const data = this.state;            
            carService.create(data).then(() => {            
                this.props.history.push('/')
                
            })
            
        };

        
        render() {
            const { imgUrl, make, model, price, description, gearbox, engine, phoneNumber } = this.state;
            return (
                <form className='create-ad'>

                    <div className='create'>
                    <label>ImageUrl:</label>
                    <input type="text" value={imgUrl} onChange={this.changeImgUrl} id="imgUrl" />
                    </div>

                    <div className='create'>
                    <label>Make:</label>
                    <input type="text" value={make} onChange={this.changeMake} id="make" />
                    </div>

                    <div className='create'>
                    <label>Model:</label>
                    <input type="text" value={model} onChange={this.changeModel} id="model" />
                    </div>

                    <div className='create'>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={this.changePrice} id="price" />
                    </div>

                    <div className='create'> 
                    <label>Description:</label>
                    <input type="text" value={description} onChange={this.changeDescription} id="description" />
                    </div>

                    <div className='create'> 
                    <label>Phone Number:</label>
                    <input type="text" value={phoneNumber} onChange={this.changePhoneNumber} id="phoneNumber" />
                    </div>
                    <div className='create'>
                    <div className='create-chek'> 
                        <label htmlFor='gearbox'>Gearbox:</label>
                        <select id='gearbox' className='create' onChange={this.changeGearbox} value={gearbox}>
                            <option value=''>Choose...</option>
                            <option value='Manual'>Manual</option>
                            <option value='Automatic'>Automatic</option>
                        </select>
                    </div>

                    <div className='create-chek'> 
                        <label htmlFor='engine'>Engine:</label>
                        <select id='engine' className='create' onChange={this.changeEngine} value={engine}>
                            <option value=''>Choose...</option>
                            <option value='Diesel'>Diesel</option>
                            <option value='Petrol'>Petrol</option>
                            <option value='Hybrid'>Hybrid</option>
                            <option value='Electric'>Electric</option>

                        </select>
                    </div>
                    </div>

                    
                    
                    <button className='create' type='button' onClick={this.submitBtn}>Create</button>
                </form>
            )
        }
    }

    export default Create;