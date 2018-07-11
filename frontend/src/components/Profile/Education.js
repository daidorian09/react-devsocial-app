import React, { Component } from 'react'
import propTypes from 'prop-types'

import {connect} from 'react-redux'
import Moment from 'react-moment'

import {deleteEducation} from '../../actions/profile/profile'

 class Education extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(event) {

        this.props.deleteEducation(event.target.value)
    }
    
    
  render() {
      const educations = this.props.education.map(edu => (
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
                <Moment format="DD.MM.YYYY">{edu.from}</Moment>
                - 
               {
                   edu.to === null ? (
                       "Current" ): (
                        <Moment format="DD.MM.YYYY">{edu.to}</Moment>
                    )                                      
               }
            </td>
            <td>{edu.description}</td>
            <td>
                <button className="btn btn-danger" onClick={this.onDelete} name="delete-btn" value={edu._id}>Delete </button>
            </td>
          </tr>
      ))
    return (
        <div>
      {
          educations.length === 0 ? (
              ""
          ) : (
            <div>
                <h4 className="mb-4">Education Info</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                <td>School</td>
                                <td>Degree</td>
                                <td>Field Of Study</td>
                                <td>Duration</td>
                                <td>Description</td>
                                <td>Operation</td>
                                </tr>
                            </thead>
                            <tbody>
                                {educations}
                            </tbody>
                        </table>
                </div>
          )
        }
        </div>
    )
  }
}

Education.propTypes = {
    deleteEducation : propTypes.func.isRequired
  }

export default connect(null, {deleteEducation})(Education)
