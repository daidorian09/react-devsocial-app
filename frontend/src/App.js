import React, {
  Component
} from 'react';
import './';

import {Provider} from 'react-redux'
import store from './redux/store'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/token/setAuthToken'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Index from './components/Layout/Index'
import Dashboard from './components/Dashboard/Dashboard'

import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'

import { setCurrentUser, signOut } from './actions/authentication/auth';
import { clearCurrentProfile } from './actions/profile/profile';

//Validate token
if(localStorage.devSocialToken){
  setAuthToken(localStorage.devSocialToken)

  const decodedToken = jwt_decode(localStorage.devSocialToken)

  store.dispatch(setCurrentUser(decodedToken))

  //Validate token expiration
  const now = Date.now() / 1000

  if(decodedToken < now){
    //Call signOut
    store.dispatch(signOut)

    //Clear user profile
    store.dispatch(clearCurrentProfile)

    window.location.href = "/login"
  }

}



class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className = "App" >
            <Navbar/>
              <Route exact path = "/" component = {Index}/>
              <div className="container">
              <Route exact path = "/signup" component = {SignUp}/>
              <Route exact path = "/login" component = {Login}/>         
              <Route exact path = "/dashboard" component = {Dashboard}/>         
              </div>
            <Footer/>
          </div>      
        </Router>
      </Provider>
    );
  }
}

export default App;