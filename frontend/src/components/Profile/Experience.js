import React, { Component } from 'react'
import propTypes from 'prop-types'

import {connect} from 'react-redux'
import Moment from 'react-moment'

import {deleteExperience} from '../../actions/profile/profile'

 class Experience extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(event) {

        this.props.deleteExperience(event.target.value)
    }
    
    
  render() {
      const experiences = this.props.experience.map(exp => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD.MM.YYYY">{exp.from}</Moment>
                - 
               {
                   exp.to === null ? (
                       "Current" ): (
                        <Moment format="DD.MM.YYYY">{exp.to}</Moment>
                    )                                      
               }
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.onDelete} name="delete-btn" value={exp._id}>Delete </button>
            </td>
          </tr>
      ))
    return (
        <div>
      {
          experiences.length === 0 ? (
              ""
          ) : (
            <div>
                <h4 className="mb-4">Experiences</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                <td>Company</td>
                                <td>Title</td>
                                <td>Years</td>
                                <td>Operation</td>
                                </tr>
                            </thead>
                            <tbody>
                                {experiences}
                            </tbody>
                        </table>
                </div>
          )
        }
        </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience : propTypes.func.isRequired
  }

export default connect(null, {deleteExperience})(Experience)
