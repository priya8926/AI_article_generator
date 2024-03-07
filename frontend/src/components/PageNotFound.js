import React from 'react'
import {NavLink} from 'react-router-dom'

function PageNotFound() {
  return (
    <>
      <div className='container'>
      <div className="content text-center">
        <h2 className="header">404</h2>
        <h4>Sorry! Page Not Found</h4>
        <p>Oops! it semas like the page you are trying to acess does not exit.
        if you believe there is an issue feel free to report it,and we will look inti it.</p>
        <div className="btns">
        <NavLink to = '/home' >  <button className='btn btn-primary'>Return home</button></NavLink>
        </div>
      </div>
      </div>
    </>
  )
}

export default PageNotFound
