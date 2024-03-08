import React from 'react'
import { NavLink } from 'react-router-dom'

function ServiceLayout() {
  return (
    <>
      <>
  {/* Service Start */}
  <div className="container-fluid mt-5 bg-light">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
            Our Services
          </div>
          <h1 className="mb-4">Our Excellent AI Solutions for Your Business</h1>
          <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor
            sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem
            et sit, sed stet no labore lorem sit. Sanctus clita duo justo et
            tempor eirmod magna dolore erat amet
          </p>
          <NavLink className="btn btn-primary rounded-pill px-4" to="">
            Read More
          </NavLink>
        </div>
        <div className="col-lg-7">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="row g-4">
                <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                      <i className="fa fa-home fa-2x" />
                    </div>
                    <h5 className="mb-3">Robotic Automation</h5>
                    <p>
                      Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                      lorem sed diam stet diam sed stet lorem.
                    </p>
                    <NavLink className="btn px-3 mt-auto mx-auto" to="">
                      Read More
                    </NavLink>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                      <i className="fa fa-home fa-2x" />
                    </div>
                    <h5 className="mb-3">Machine learning</h5>
                    <p>
                      Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                      lorem sed diam stet diam sed stet lorem.
                    </p>
                    <NavLink className="btn px-3 mt-auto mx-auto" to="">
                      Read More
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 pt-md-4">
              <div className="row g-4">
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                      <i className="fa fa-home fa-2x" />
                    </div>
                    <h5 className="mb-3">Education &amp; Science</h5>
                    <p>
                      Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                      lorem sed diam stet diam sed stet lorem.
                    </p>
                    <NavLink className="btn px-3 mt-auto mx-auto" to="">
                      Read More
                    </NavLink>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.7s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                      <i className="fa fa-home fa-2x" />
                    </div>
                    <h5 className="mb-3">Predictive Analysis</h5>
                    <p>
                      Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                      lorem sed diam stet diam sed stet lorem.
                    </p>
                    <NavLink className="btn px-3 mt-auto mx-auto" to="">
                      Read More
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
</>

    </>
  )
}

export default ServiceLayout
