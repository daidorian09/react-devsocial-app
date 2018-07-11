import React, { Component } from 'react'
import propTypes from 'prop-types'

import {connect} from 'react-redux'
import {signIn} from "../../actions/authentication/auth"

import isEmpty from '../../utils/validation/isEmpty'
import {PASSWORD_LENGTH, EMAIL_REGEX} from '../../utils/config/signupConfig'

import TextFieldGroup from "../Shared/TextFieldGroup"

import Error from '../Error/Error'

export class Login extends Component {

    constructor() {
        super();
        this.state = {
          email : "",
          password : "",
          errors : {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
    
      onChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      onSubmit(event) {
        event.preventDefault()

        const isLoginFormValid = this.validateLoginFormInputs()

        if (isLoginFormValid) {
          const login = {
            email: this.state.email,
            password: this.state.password
          }

          this.props.signIn(login)
        }
      }

      componentWillMount(){
        if(this.props.auth.isAuthenticated){
          this.props.history.push("/dashboard")
        }
      }

      componentWillReceiveProps(nextProps){

        if(nextProps.auth.isAuthenticated){
          this.props.history.push("/dashboard")
        }

        if(nextProps.errors){
          this.setState({
            errors : nextProps.errors
          })
        }
      }

      validateLoginFormInputs() {
        const {
          email,
          password
        } = this.state
        let errors = {}

        if (isEmpty(email)) {
          errors.email= "Email field is required";
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

        this.setState({
          errors: errors,
        })

        return isEmpty(errors)

      }
    

      render() {
        const { errors } = this.state
    
        return (

          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">
                    Sign in to your DevConnector account
                  </p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
    
                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />                
                   
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>    
                {
                    errors.isActive && <Error errorMessage = {errors.isActive} />
                }         
                </div>
               
              </div>
            </div>
          </div>
        );
      }
}
//Component PropTypes
Login.propTypes = {
  signIn : propTypes.func.isRequired,
  auth : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

//Get data via state 
const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})

//Bind component state and function to redux store
export default connect(mapStateToProps, {signIn})(Login)

