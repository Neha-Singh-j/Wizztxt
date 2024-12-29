import React from 'react'

const Alert = (props) => {
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{props.alert.type}</strong>:{props.alert.msg}
   <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  )
}

export default Alert
