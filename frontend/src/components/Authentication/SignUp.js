import React, { Component } from 'react'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


import {connect} from 'react-redux'
import {signUp} from '../../actions/authentication/auth'

import TextFieldGroup from "../Shared/TextFieldGroup"

export class SignUp extends Component {
  
  constructor() {
    super();
    this.state = {
      name : "",
      email : "",
      password : "",
      confirmPassword : "",
      errors : {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard")
    }
  }

  onSubmit(event) {
    event.preventDefault()    

    const newUser = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      confirmPassword : this.state.confirmPassword
    }

    this.props.signUp(newUser, this.props.history)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors : nextProps.errors
      })
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevSocial account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Component PropTypes
SignUp.propTypes = {
  signUp : propTypes.func.isRequired,
  auth : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

//Get data via state 
const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})

//Bind component state and function to redux store
export default connect(mapStateToProps, {signUp})(withRouter(SignUp))
