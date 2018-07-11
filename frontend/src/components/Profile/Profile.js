import React, { Component } from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileInfo from './ProfileInfo'
import ProfileGithub from './ProfileGithub'
import Spinner from '../Shared/Spinner'

import {getProfileByHandle} from '../../actions/profile/profile'

import isEmpty from '../../utils/validation/isEmpty'

 class Profile extends Component {

    componentDidMount() {
        if(this.props.match.params.handle) {

            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }

    componentWillReceiveProps (nextProps) {

        if(isEmpty(nextProps.profile.profile)) {
            this.props.history.push("/not-found")
        }
    }

  render() {
      const {profile, loading} = this.props.profile
      let content

      if(profile === null | loading){
          content = <Spinner />
      } else {
          content = (
              <div>
                  <div className="row">
                    <div className="col-md-6">
                        <Link to="/developers"  className="btn btn-light mb-3 float-left">
                            Go Back
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <ProfileHeader profile={profile}/>   
                            <ProfileAbout profile={profile}/>   
                            <ProfileInfo education={profile.education} experience={profile.experience}/>   
                            {
                                profile.githubusername ? (<ProfileGithub username = {profile.githubusername}/>) : null
                            }
                        </div>
                    </div>
              </div>
          )
      }

    return (
      <div className="profile">
           <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {content}
                        </div>
                    </div>
            </div>
      </div>
    )
  }
}

Profile.propTypes = {
    getProfileByHandle : propTypes.func.isRequired,
    profile: propTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    profile: state.profile
  }) 


export default connect(mapStateToProps, {getProfileByHandle})(Profile)
