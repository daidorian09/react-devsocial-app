import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'

import '../../assets/css/style.css'

class Index extends Component{

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard")
    }
  }

    render(){
        return(
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Developer Connector
                    </h1>
                    <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                    <hr />
                    <Link to="/signup" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

//Component PropTypes
Index.propTypes = {
  auth : propTypes.object.isRequired
}

//Get data via state 
const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})

export default connect(mapStateToProps)(Index)
