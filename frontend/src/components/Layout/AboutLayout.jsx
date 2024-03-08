import React from 'react'
import AboutImg from '../../img/about-img.jpg'
import { NavLink } from 'react-router-dom'
import Spinner from './Spinner'

function AboutLayout() {
  return (
    <>
  <div className="container-fluid py-5 mt-2">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="about-img">
            <img className="img-fluid" src={AboutImg} />
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
            About Us
          </div>
          <h1 className="mb-4">
            We Make Your Business Smarter with Artificial Intelligence
          </h1>
          <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor
            sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem
            et sit, sed stet no labore lorem sit. Sanctus clita duo justo et
            tempor eirmod magna dolore erat amet
          </p>
          <p className="mb-4">
            Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et
            sit, sed stet no labore lorem sit. Sanctus clita duo justo et
            tempor.
          </p>
          <div className="row g-3">
            <div className="col-sm-6">
              <h6 className="mb-3">
                <i className="fa fa-check text-primary me-2" />
                Award Winning
              </h6>
              <h6 className="mb-0">
                <i className="fa fa-check text-primary me-2" />
                Professional Staff
              </h6>
            </div>
            <div className="col-sm-6">
              <h6 className="mb-3">
                <i className="fa fa-check text-primary me-2" />
                24/7 Support
              </h6>
              <h6 className="mb-0">
                <i className="fa fa-check text-primary me-2" />
                Fair Prices
              </h6>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <NavLink className="btn btn-primary rounded-pill px-4 me-3" to="">
              Read More
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-square me-3" to="">
              <i className="fab fa-facebook-f" />
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-square me-3" to="">
              <i className="fab fa-twitter" />
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-square me-3" to="">
              <i className="fab fa-instagram" />
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-square" to="">
              <i className="fab fa-linkedin-in" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
 
  )
}

export default AboutLayout
