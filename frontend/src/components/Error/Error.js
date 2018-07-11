import React from 'react'

export default ({errorMessage}) => {
  return (
    <div className="alert alert-danger" style={{ marginTop : "10px",  textAlign: "center"}} role="alert">
    <button type="button" className="close" data-dismiss="alert">×</button>
    {errorMessage}
  </div>
  )
}
