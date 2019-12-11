import React from 'react';
import './App.css';
import Header from './header/Header';
import Footer from './Common/footer/Footer';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Register from './Common/register/Register';
import Login from './Common/login/login';
import Logout from './Common/Logout/Logout';
import Create from './create/Create';
import Profile from './profile/Profile';
import Home from './home/home';
import Details from './Product/details/details';
import Main from './Main/Main';
import userService from './services/car-service';
import Edit from './Product/edit/Edit';
import Delete from './Product/delete/Delete';


function render(title, Cmp, otherProps) {
  return function (props) {
    return <Main title={title} ><Cmp {...props} {...otherProps} /></Main>
    
  };
}
function parseCookeis() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    const cookies = parseCookeis();
    const isLogged = !!cookies['x-auth-token'];
    this.state = { isLogged };
    
  }

  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false });
      window.localStorage.clear();
      history.push('/');
      return null;
    });
  }

  login = (history, data) => {
    return userService.login(data).then((newData) => {      
      if (newData === 'Invalid username or password') {
        alert('Invalid username or password')
        return
      };    
      const userData = JSON.parse(newData)   
      window.localStorage.setItem('userId',JSON.stringify(userData._id));
      window.localStorage.setItem('username', userData.username);  
      this.setState({ isLogged: true });
      history.push('/');
    })
  }

  render() {
    
    const { isLogged } = this.state;
    const username = window.localStorage.getItem('username')
    return (
      
      <BrowserRouter>
    <div className="App">
      
        <Header isLogged={isLogged} />
        <div className='app-container'>
          <Switch>
            <Route path='/' exact><Redirect to='/cars-list' /></Route>
    
            <Route path='/cars-list' render={render('Home page', Home, { isLogged })}/>
            
            <Route path='/register' render={render('Register', Register, { isLogged })} />
            <Route path='/login' render={render('Login', Login, { isLogged, login: this.login })}  />
            <Route path='/logout' render={render('Logout', Logout, { isLogged, logout: this.logout })}  />
            <Route path='/create' render={render('Create', Create, { isLogged })}  />
            <Route path='/profile'render={render(`${username}'s Profile`, Profile, { isLogged })}  />
            <Route path='/details' render={render('Car details', Details, { isLogged })}  />
            <Route path='/edit' render={render('Edit', Edit)}  />
            <Route path='/delete' render={render('Delete', Delete)}  />
          </Switch>
        </div>
        <Footer />
    </div>
    </BrowserRouter>
   
  )
  }
}


export default App;
