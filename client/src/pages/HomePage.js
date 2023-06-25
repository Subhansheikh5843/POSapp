import React from 'react'
import '../styles/HomePage.css'
import { Link,NavLink } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <video autoPlay muted loop id='myVideo'>
        <source src='/assets/videos/bg.mp4' type='video/mp4' />
      </video>

      <div className='content' style={{marginTop:"-30px"}}>
        <div className='card w-25'>
          <img src='/assets/logo.png' alt='logo' />
        {/* <hr /> */}
        <div className='card-body'>
          <h5 className='card-title'>Pakistan No #1 Carrer Platform</h5>
          <p className='card-text'>
            Search and manage your jobs with ease. free and open source  job portal 
          </p>
          <div className='d-flex justify-content-between mt-5'>
            <p>Not a Registered user  <Link to="/register">Here !</Link> </p>
              <p>
                <NavLink to="/login" className='myBtn'>Login</NavLink>
              </p>
          </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default HomePage