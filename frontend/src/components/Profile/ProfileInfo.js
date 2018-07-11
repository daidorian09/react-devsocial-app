import React, { Component } from 'react'

import Moment from 'react-moment'
import isEmpty from '../../utils/validation/isEmpty';

 class ProfileInfo extends Component {
  render() {

    const {experience, education} = this.props

    const exp = experience.map((experience, item) => (
      <li key={item} className = "list-group-item">
        <h4>{experience.company}</h4>
        <p>
          <Moment format="DD.MM.YYYY">{experience.from}</Moment>
          - 
          {experience.to === null ? (
                       "Current" ): (
                        <Moment format="DD.MM.YYYY">{experience.to}</Moment>
                    )
          } 
        </p>
        <p><strong>Position : </strong>{experience.title}</p>
        <p>
          {isEmpty(experience.location) ? null : (
            <span>
              <strong>Location :</strong>
              {experience.location}
            </span>
          )}
          </p>
          <p>
          {isEmpty(experience.description) ? null : (
            <span>
              <strong>Description :</strong>
                {experience.description}
            </span>
          )}
          </p>
        </li>
    ))

    const edu = education.map((edu, item) => (
      <li key={item} className = "list-group-item">
        <h4>{exp.school}</h4>
        <p>
          <Moment format="DD.MM.YYYY">{edu.from}</Moment>
          -
          {edu.to === null ? (
                       "Current" ): (
                        <Moment format="DD.MM.YYYY">{edu.to}</Moment>
                    )
          }                                   
               
        </p>
        <p><strong>Degree : </strong>{edu.degree}</p>
        <p><strong>Field of Study : </strong>{edu.fieldofstudy}</p>
          <p>
          {isEmpty(exp.description) ? null : (
            <span>
              <strong>Description :</strong>
                {exp.description}
            </span>
          )}
          </p>
        </li>
    ))

    return (
      <div className="row">
          <div className="col-md-6">
            <h3 className="text-center text-info">
              Experience</h3>
              {
                exp.length > 0 ? (
                  <ul className="list-group">
                    {exp}
                    </ul>
                ) : (
                  <p className="text-center">
                    No experience found
                    </p>
                )
              }
            </div>
          <div className="col-md-6">
            <h3 className="text-center text-info">
              Education</h3>
              {
                edu.length > 0 ? (
                  <ul className="list-group">
                    {edu}
                    </ul>
                ) : (
                  <p className="text-center">
                    No education found
                    </p>
                )
              }
            </div>
        
      </div>
    )
  }
}

export default ProfileInfo
