import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import propTypes from 'prop-types'
import {connect} from "react-redux"

import {signOut} from "../../actions/authentication/auth"
import {clearCurrentProfile} from '../../actions/profile/profile'



import '../../assets/css/style.css'

class Navbar extends Component{

  constructor(props) {
    super(props);
    
    this.onSignOut = this.onSignOut.bind(this)
  }

  onSignOut(event){
    event.preventDefault()
    this.props.signOut()
    this.props.clearCurrentProfile()

  }
    render(){

      const {isAuthenticated, user} = this.props.auth

      const authRequiredLinks = (                
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">My Profile</Link>
        </li>
          <li className="nav-item">       
          <Link
            to = "/"
            onClick={this.onSignOut} 
            className="nav-link">
            <img 
            className="rounded-circle"
            src={user.avatar} 
            alt={user.name} 
            title="Gravar required to be conntected to your email"
            style={{width:"25px", marginRight:"5px"}}/>
            Sign Out
          </Link>   
          </li>
        </ul>
      )

      const guestLinks = (                
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
      )

        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <Link className="navbar-brand" to="/">DevSocial</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                  <span className="navbar-toggler-icon"></span>
                </button>
          
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/developers"> Developers
                      </Link>
                    </li>
                  </ul>
                  {
                    isAuthenticated ? authRequiredLinks : guestLinks
                  }
                </div>
              </div>
            </nav>
        )
    }
}

//Component PropTypes
Navbar.propTypes = {
  signOut : propTypes.func.isRequired,
  auth : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth : state.auth
})

export default connect(mapStateToProps, {signOut, clearCurrentProfile})(Navbar)
