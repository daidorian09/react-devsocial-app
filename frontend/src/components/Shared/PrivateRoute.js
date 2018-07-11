import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import propTypes from 'prop-types'

const PrivateRoute = ({component : Component, auth, ...rest}) => (
    <Route {...rest}
    render = {props => 
        auth.isAuthenticated ? (<Component {...props} />) : (<Redirect to = "/login" />)
    }
    />
)

PrivateRoute.propTypes = {
    auth : propTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})


export default connect(mapStateToProps)(PrivateRoute)
