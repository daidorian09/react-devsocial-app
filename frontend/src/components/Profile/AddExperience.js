import React, { Component } from 'react'

import{Link, withRouter} from 'react-router-dom'

import TextFieldGroup from '../Shared/TextFieldGroup'
import TextAreaFieldGroup from '../Shared/TextAreaFieldGroup'

import {connect} from 'react-redux'
import propTypes from 'prop-types'

import {addExperience} from '../../actions/profile/profile'


class AddExperience extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            company : "",
            title : "",
            location : "",
            from : "",
            to : "",
            current : false,
            description : "",
            errors: {},
            disabled : false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
    onSubmit(event) {
        event.preventDefault()

        const experience = {
            company : this.state.company,
            current : this.state.current,
            description : this.state.description,
            title : this.state.title,
            location : this.state.location,
            from : this.state.from,
            to : this.state.to,
        }

        this.props.addExperience(experience, this.props.history)
    }
    
    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onCheck(event) {
        this.setState({
            disabled : !this.state.disabled,
            current : !this.state.current
        })
    }

  render() {
      const {errors}  = this.state
    return (
        <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                />
                 <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
                />
                <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                />
                <h6>From Date </h6>
                <TextFieldGroup
                type = "date"
                name="from"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
                />
                <h6>To Date </h6>
                <TextFieldGroup
                type = "date"
                name="to"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled = {this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" name="current" value="" id="current" checked={this.state.current} onChange={this.onCheck}/>
                <label className="form-check-label">
                Current Job
               </label>
                </div>
                <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us a little about position"
                  />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
    addExperience : propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  }) 

export default connect(mapStateToProps, {addExperience} )(withRouter(AddExperience))