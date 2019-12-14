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
import NotFound from './NotFoundPage/NotFound';
import Link from './header/Links/Link';
import Favourites from './profile/Favourites/Favourites';
import Contact from './Contact/Contact';

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
      window.localStorage.setItem('username', userData.firstName);  
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
            {/* <ProtectedRoutes isLogged={isLogged} redirectTo='/' path='/cars-list' render={render('Home page', Home, { isLogged })} /> */}
            
            <Route path='/register' render={render('Register', Register, { isLogged })} />
            <Route path='/login' render={render('Login', Login, { isLogged, login: this.login })}  />
            <Route path='/logout' render={render('Logout', Logout, { isLogged, logout: this.logout })}  />
            <Route path='/contact' render={render('Contact us', Contact)}  />

            {/* <ProtectedRoute 
              isAuthenticated={isLogged}
              redirectTo='/login'
              path='/create' render={render('Create', Create, { isLogged })}
            /> */}
            {isLogged ? 
            <Route path='/create' render={render('Create', Create, { isLogged })}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }
            {isLogged ? 
            <Route path='/details' render={render('Car details', Details, { isLogged })}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }
            {isLogged ? 
            <Route path='/profile'render={render(`${username}'s Profile`, Profile, { isLogged })}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }
            {isLogged ? 
            <Route path='/edit' render={render('Edit', Edit,{ isLogged })}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }  
            {isLogged ? 
            <Route path='/delete' render={render('Delete', Delete)}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }
            {isLogged ? 
            <Route path='/favourite' render={render('Favourite', Favourites, { isLogged })}  /> : 
            <div>
              <h1>Must login first</h1>
              <Link to='/login'><button className='protected-login'>Login</button></Link>
            </div>
            }  
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
    </div>
    </BrowserRouter>
   
  )
  }
}


export default App;
