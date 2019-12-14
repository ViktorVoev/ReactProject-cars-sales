import React from 'react';
import * as yup from 'yup';

import './register.css';
import withForm from '../../shared/withForm';
import userService from '../../services/car-service';


class Register extends React.Component {

  usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
  passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
  rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');
  firstNameOnChangeHandler = this.props.controlChangeHandlerFactory('firstName');
  lastNameOnChangeHandler = this.props.controlChangeHandlerFactory('lastName');
  ageOnChangeHandler = this.props.controlChangeHandlerFactory('age');
  sexOnChangeHandler = this.props.controlChangeHandlerFactory('sex');

  submitHandler = () => {
    const errors = this.props.getFormErrorState();
    if (!!errors) { return; }
    const data = this.props.getFormState();
    if (data.password !== data.rePassword) {
      console.log(data);
      alert("Password don't match!")
      return
    }
    userService.register(data).then(() => {
      this.props.history.push('/login');
    });
  };

  getFirstControlError = name => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  };

  render() {
    const usernameError = this.getFirstControlError('username');
    const passwordError = this.getFirstControlError('password');
    const rePasswordError = this.getFirstControlError('rePassword');

    return <form className="Register">
      <div className="register">
        <label>Username</label>
        <input type="text" onChange={this.usernameOnChangeHandler} />
        {usernameError && <div className="error">{usernameError}</div>}
      </div>
      <div className="register">
        <label>Password</label>
        <input type="password" onChange={this.passwordOnChangeHandler} />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <div className="register">
        <label>Re-Password</label>
        <input type="password" onChange={this.rePasswordOnChangeHandler} />
        {rePasswordError && <div className="error">{rePasswordError}</div>}
      </div>
      <div className="register">
        <label>First Name:</label>
        <input type="text" onChange={this.firstNameOnChangeHandler} />
      </div>
      <div className="register">
        <label>Last Name:</label>
        <input type="text" onChange={this.lastNameOnChangeHandler} />
      </div>
      <div className="register">
        <label>Age:</label>
        <input type="text" onChange={this.ageOnChangeHandler} />
      </div>
      <div className='register'> 
                        <label htmlFor='register'>Sex:</label>
                        <select id='sex' className='register' onChange={this.sexOnChangeHandler}>
                            <option value=''>Choose...</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
      </div>
      
     
      <div className="register">
        <button className='register' type="button" onClick={this.submitHandler}>Register</button>
      </div>
    </form>;
  }
}

const initialFormState = {
  username: '',
  password: '',
  rePassword: '',
  firstName: '',
  lastName: '' , 
  age: '',
  sex: '',
  favourite: []
};

const schema = yup.object({
  username: yup.string('Username shoud be a string')
    .required('Username is required')
    .min(4, 'Username should be more than 4 chars'),

  password: yup.string('Password must be a string')
    .required('Password is required')
    .min(6, 'Password must be more than 6 chars'),

  rePassword: yup.string('Password must be a string'),
  firstName: yup.string('Must be string')
                .required('Password is required')
                .min(4, 'Username should be more than 4 chars'),
  lastName: yup.string('Must be string')
  .required('Password is required')
  .min(4, 'Username should be more than 4 chars'),
  age: yup.string('Must be string')
  .required('Password is required'),
  sex: yup.string('Must be string')
});


export default withForm(Register, initialFormState, schema)