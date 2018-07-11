import React, { Component } from 'react'
import propTypes from 'prop-types'


import {connect} from 'react-redux'
import {confirmActivation} from "../../actions/authentication/auth"

class ConfirmActivation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            token : {}
        }
    }


    componentDidMount() {
        const confirmationToken = this.props.match.params.token
        if (!confirmationToken) {
            this.props.history.push("/confirmation-token-not-found")
        }

        const data = {
            token: confirmationToken.trim()
        }

        this.props.confirmActivation(data)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        if(nextProps.token) {

            alert(nextProps.token)
            this.setState({
                token : nextProps.token
            })
        }
    }

  render() {

    const { errors, auth } = this.state


    return (
        <div>
            <h5>{
                errors && (
                    <p>Fuck</p>
                )
            }</h5>
      </div>
    )
  }
}

//Component PropTypes
ConfirmActivation.propTypes = {
    confirmActivation : propTypes.func.isRequired,
    errors : propTypes.object.isRequired
  }
  
  //Get data via state 
  const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
  })

export default connect(mapStateToProps, {confirmActivation})(ConfirmActivation)

