import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5  ">
        <div className="container py-5 ">
          <div className="row g-5">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <NavLink to="index.html" className="d-inline-block mb-3">
                <h1 className="text-white">
                  AI<span className="text-primary"></span>Article
                </h1>
              </NavLink>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit.
                Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit,
                sed stet no labore lorem sit. Sanctus clita duo justo et tempor
              </p>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <h5 className="text-white mb-4">Get In Touch</h5>
              <p>
                <i className="fa fa-map-marker-alt me-3" />
                123 Street, New York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt me-3" />
                +012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope me-3" />
                info@example.com
              </p>
              <div className="d-flex pt-2">
                <NavLink className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-twitter" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-facebook-f" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-youtube" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-instagram" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-linkedin-in" />
                </NavLink>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <h5 className="text-white mb-4">Popular Link</h5>
              <NavLink className="btn btn-link" to="">
                About Us
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Contact Us
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Privacy Policy
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Terms &amp; Condition
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Career
              </NavLink>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <h5 className="text-white mb-4">Our Services</h5>
              <NavLink className="btn btn-link" to="">
                Robotic Automation
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Machine learning
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Predictive Analysis
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Data Science
              </NavLink>
              <NavLink className="btn btn-link" to="">
                Robot Technology
              </NavLink>
            </div>
          </div>
        </div>
        <div className="container wow fadeIn" data-wow-delay="0.1s">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©
                <NavLink className="border-bottom" to="#">
                  AIArticle
                </NavLink>
                , All Right Reserved.
                Designed By
                <NavLink className="border-bottom" to="https://htmlcodex.com">
                  HTML Codex
                </NavLink>
                Distributed By
                <NavLink className="border-bottom" to="https://themewagon.com">
                  ThemeWagon
                </NavLink>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <NavLink to="">Home</NavLink>
                  <NavLink to="">Cookies</NavLink>
                  <NavLink to="">Help</NavLink>
                  <NavLink to="">FAQs</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Footer
