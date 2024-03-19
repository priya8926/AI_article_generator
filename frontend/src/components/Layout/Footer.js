import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 " style={{
        // position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",

      }}>
        <div className="container py-4 ">
          <div className="row g-5">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <NavLink to="/home" className="d-inline-block mb-3">
                <h2 className="text-white">
                  AI<span className="text-primary"></span>Article
                </h2>
              </NavLink>
              <p className="mb-0">
                Create unlimited unique essays, articles or content for your website or blog the fastest and simpliest way, no more wasting hours writing articles.Create articles automatically on any subject by adding keyword and use the generated articles with any of your favorite SEO software.
              </p>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <h5 className="text-white mb-4">Get In Touch</h5>
              <p>
                <i className="fa fa-map-marker-alt me-3" />
                396472 Navsari,Gujrat
              </p>
              <p>
                <i className="fa fa-phone-alt me-3" />
                +91 9427840566
              </p>
              <p>
                <i className="fa fa-envelope me-3" />
                info@gmail.com
              </p>
              <div className="d-flex pt-2">
                <NavLink className="btn btn-outline-light btn-social" to="https://twitter.com/">
                  <i className="fab fa-twitter" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="https://www.youtube.com/">
                  <i className="fab fa-youtube" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="https://www.instagram.com/">
                  <i className="fab fa-instagram" />
                </NavLink>
                <NavLink className="btn btn-outline-light btn-social" to="https://www.linkedin.com/">
                  <i className="fab fa-linkedin-in" />
                </NavLink>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <h5 className="text-white mb-4">Popular Link</h5>
              <NavLink className="btn btn-link" to="/about">
                About Us
              </NavLink>
              <NavLink className="btn btn-link" to="/contact">
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
              <NavLink className="btn btn-link" to="/services">
                Robotic Automation
              </NavLink>
              <NavLink className="btn btn-link" to="/services">
                Multiple Language support
              </NavLink>
              <NavLink className="btn btn-link" to="/services">
                Download Articles
              </NavLink>
              <NavLink className="btn btn-link" to="/services">
                Multiple Category
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
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="">Cookies</NavLink>
                  <NavLink to="">Help</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    </>
  )
}

export default Footer
