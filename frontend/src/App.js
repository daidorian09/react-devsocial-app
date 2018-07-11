import React, {
  Component,
  Fragment
} from 'react';
import './';

import {Provider} from 'react-redux'
import store from './redux/store'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/token/setAuthToken'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Index from './components/Layout/Index'
import Dashboard from './components/Dashboard/Dashboard'
import Profiles from './components/Profile/Profiles'
import PrivateRoute from './components/Shared/PrivateRoute'

import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'
import ConfirmActivation from './components/Authentication/ConfirmActivation'
import CreateProfile from './components/Profile/CreateProfile'
import EditProfile from './components/Profile/EditProfile'
import AddExperience from './components/Profile/AddExperience'
import AddEducation from './components/Profile/AddEducation'

import NotFound from './components/Shared/NotFound'
import ActivationTokenNotFound from './components/Error/ConfirmationTokenNotFound'

import Profile from './components/Profile/Profile'

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
          <Fragment>
            <div className = "App">
              <Navbar/>
                <Route exact path = "/" component = {Index}/>
                <div className="container">
                <Switch> <Route exact path = "/signup" component = {SignUp}/>
                <Route exact path = "/login" component = {Login}/>
                <Route exact path="/confirm-activation/:token" component={ConfirmActivation} />
                <Route exact path="/developers" component={Profiles}/>
                <Route exact path="/developers/:handle" component={Profile}/> 
                <PrivateRoute exact path = "/dashboard" component = {Dashboard}/>
                <PrivateRoute exact path = "/create-profile" component = {CreateProfile}/>
                <PrivateRoute exact path = "/edit-profile" component = {EditProfile}/>  
                <PrivateRoute exact path = "/add-experience" component = {AddExperience}/>
                <PrivateRoute exact path = "/add-education" component = {AddEducation}/>    
                <Route  path="*" component={NotFound} />      
                </Switch>
                </div>
              <Footer/>
            </div>  
          </Fragment>    
        </Router>
      </Provider>
    );
  }
}

export default App;