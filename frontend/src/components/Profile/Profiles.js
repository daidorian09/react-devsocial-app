import React, { Component } from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'

import Spinner from "../Shared/Spinner"
import Developers from "./Developers"

import {getProfiles} from '../../actions/profile/profile'


 class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles()
    }

  render() {
    const { profiles, loading } = this.props.profile;

    let items

    if (profiles === null || loading) {
        items = <Spinner />;
      } else {
          if(profiles.length > 0) {
            items =  profiles.map(profile => (
                <Developers key={profile._id} profile={profile} />
            ))
          } else {
              items = <h4>No profile is found </h4>
          }
      }

    return (        
      <div className="profies">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developers</h1>
                        <p className="lead text-center">Connect developers...</p>    
                        {items}                  
                    </div>
                  
                </div>
            </div>        
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles: propTypes.func.isRequired,
    profile : propTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    profile : state.profile
  })

  export default connect(mapStateToProps, { getProfiles })(Profiles)
