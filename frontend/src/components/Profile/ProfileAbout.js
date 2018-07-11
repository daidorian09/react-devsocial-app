import React, { Component } from 'react'


import isEmpty from '../../utils/validation/isEmpty'
import propTypes from 'prop-types'

 class ProfileAbout extends Component {
  render() {
    const {profile} = this.props
    const skills= profile.skills.map((skill, item) => (
      <div key={item} className="p-3">
        <i className="fa fa-check"/> {skill}
      </div>
    ))
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{profile.user.name}'s Info</h3>
          <p className="lead">{isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
            {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile : propTypes.object.isRequired
}

export default ProfileAbout
