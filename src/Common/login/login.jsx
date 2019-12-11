import React from 'react';
import './login.css';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import withForm from '../../shared/withForm';

class Login extends React.Component {

  usernameChangeHandler = this.props.controlChangeHandlerFactory('username');
  passwordChangeHandler = this.props.controlChangeHandlerFactory('password');

  submitHandler = () => {
    const errors = this.props.getFormErrorState();
    if (!!errors) { return; }
    const data = this.props.getFormState();
    this.props.login(this.props.history, data)
  }

  getFirstControlError = name => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  };

  render() {
    const usernameError = this.getFirstControlError('username');
    const passwordError = this.getFirstControlError('password');

    return <form className="Login">
      <div className="login">
        <label>Username</label>
        <input type="text" onChange={this.usernameChangeHandler} />
        {usernameError && <div className="error">{usernameError}</div>}
      </div>
      <div className="login">
        <label>Password</label>
        <input type="password" onChange={this.passwordChangeHandler} />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <div className="login">
        <button className='login' type="button" onClick={this.submitHandler}>Login</button>
      </div>
      <div className="login">
        <Link to='/register'><button className='login' type="button">Register</button></Link>
      </div>
    </form>;
  }
}


const initialFormState = {
    username: '',
    password: ''
  };
  
  const schema = yup.object({
    username: yup.string('Username shoud be a string')
      .required('Username is required')
      .min(4, 'Username should be more than 4 chars'),
  
    password: yup.string('Password must be a string')
      .required('Password is required')
      .min(6, 'Password must be more than 6 chars'),
  });

export default withForm(Login, initialFormState, schema);