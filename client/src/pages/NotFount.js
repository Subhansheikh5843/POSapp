import React from 'react'
import { Link } from 'react-router-dom'

function NotFount() {
  return (
    <div>
      <h1>NotFount page</h1>
      <Link className='btn btn-success' to="/">Go Back</Link>
    </div>
  )
}

export default NotFount