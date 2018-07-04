import React, { Component } from 'react'
import propTypes from 'prop-types'

import {connect} from 'react-redux'
import {signIn} from "../../actions/authentication/auth"

import TextFieldGroup from "../Shared/TextFieldGroup"

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
    
        const login = {
          email : this.state.email,
          password : this.state.password
        }

        this.props.signIn(login)
    
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
    

      render() {
        const { errors } = this.state;
    
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

