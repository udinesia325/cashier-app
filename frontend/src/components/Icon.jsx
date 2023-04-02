import React from 'react'

function Icon({ name, className, onClick = null }) {
  return (
    <span className={`material-icons-outlined ${className}`} onClick={onClick}>
      {name}
    </span>
  )
}

export default Icon
