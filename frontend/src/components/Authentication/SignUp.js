import React, { Component } from 'react'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import isEmpty from '../../utils/validation/isEmpty'

import {PASSWORD_LENGTH, EMAIL_REGEX} from '../../utils/config/signupConfig'


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

    const isFormInputsValid =  this.validateSignUpFormInputs()

    if (isFormInputsValid) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }

      this.props.signUp(newUser, this.props.history)
    }
  }

  validateSignUpFormInputs() {
    const {
      name,
      email,
      password,
      confirmPassword
    } = this.state
    let errors = {}

    if (isEmpty(name)) {
      errors.name = "Name field is required";
    }

    if (isEmpty(email)) {
      errors.email = "Email field is required";
    }

    if (!isEmpty(email)) {
      const emailRegex = new RegExp(EMAIL_REGEX)
      if (!emailRegex.test(email)) {
        errors.email = "Email address in invalid format";
      }
    }

    if (isEmpty(password) || password.length < PASSWORD_LENGTH) {
      errors.password = `Password requires ${PASSWORD_LENGTH} characters long`
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = `Password fields are not match`
    }

    this.setState({
      errors: errors
    })

    return isEmpty(errors)
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
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={errors.confirmPassword}
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