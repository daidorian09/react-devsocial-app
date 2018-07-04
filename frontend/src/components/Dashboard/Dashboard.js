import React, { Component } from 'react'

import propTypes from 'prop-types'

import {connect} from 'react-redux'

import {getMyProfile} from '../../actions/profile/profile'

 class Dashboard extends Component {

  componentDidMount(){
    this.props.getMyProfile()
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

Dashboard.propTypes = {
  getMyProfile : propTypes.func.isRequired
}

export default connect(null, {getMyProfile})(Dashboard)