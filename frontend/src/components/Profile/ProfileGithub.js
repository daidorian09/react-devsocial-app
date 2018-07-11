import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'

import {CLIENT_ID, CLIENT_SECRET} from'../../utils/config/githubConfig'


 class ProfileGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId : CLIENT_ID,
      clientSecret : CLIENT_SECRET,
      count : 5,
      sort : "created : asc",
      repos : []
    }   
  }

  componentDidMount () {
    const {username} = this.props
    const {count, sort, clientId, clientSecret} = this.state

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_Secret=${clientSecret}`)
    .then(res => res.json())
    .then(data => {
      if(this.refs.githubAccount) {
        this.setState({
          repos : data
        })
      }      
    }).catch(err => console.log(err))
  }
  

  render() {

    const {repos} = this.state

    if(repos.length === 0) {
      console.log("asdsad")
    }

    const repoList = repos.map((rep, item) => (
      <div className="card card-body mb-2" key={item}>
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={rep.html_url} className="text-info" target="_blank" rel="noreferrer">
                  {rep.name}</Link>
              </h4>
              <p>
                {rep.description}
              </p>
              </div>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">
                  Stars : {rep.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                   Watchers : {rep.watchers_count}
                </span>
                <span className="badge badge-success">Forks : {rep.forks_count}</span>                
                </div>
            </div>
        </div>
    ))

    return (
      <div ref="githubAccount">
         <hr/>
         <h3 className="mb-4">Recent Github Repos</h3>
          {repoList}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username : propTypes.string.isRequired
}

export default ProfileGithub

