import React from 'react'

export default ({errorMessage}) => {
  return (
    <div className="alert alert-danger col-md-6 col-md-offset-3" style= {{width:"%40"}} role="alert">
      <p className="text-center">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> 
          {errorMessage}
    </p>
</div> 
  )
}
