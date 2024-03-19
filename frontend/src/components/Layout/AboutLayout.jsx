import React from 'react'
import AboutImg from '../../img/about-img.jpg'
import featureImg from '../../img/feature.png'
import { NavLink } from 'react-router-dom'

function AboutLayout() {
  return (
    <>
      <div className="container-fluid py-5 h-100 mt-2">
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
                Generate Entire Article from Scratch Using AI Article Writer
              </h1>
              <p className="mb-4">
                Article Generator can be used on any device and is 100% mobile friendly you can use Article Generator on your phone or tablet to generate articles.
              </p>
              <p className="mb-4">
                Article Generator is the cheapest solution in todays time for article writing, our goal is to provide our customers with best quality work for cheapest price possible.
              </p>
              <div className="row g-3">
                <div className="col-sm-6">
                  <h6 className="mb-3">
                    <i className="fa fa-check text-primary me-2" />
                    AI Article Writing
                  </h6>
                  <h6 className="mb-0">
                    <i className="fa fa-check text-primary me-2" />
                    AI Article Generator
                  </h6>
                </div>
                <div className="col-sm-6">
                  <h6 className="mb-3">
                    <i className="fa fa-check text-primary me-2" />
                    Long Form Article Maker
                  </h6>
                  <h6 className="mb-0">
                    <i className="fa fa-check text-primary me-2" />
                    Article Creator
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <NavLink className="btn btn-outline-primary btn-square me-3" to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f" />
                </NavLink>
                <NavLink className="btn btn-outline-primary btn-square me-3" to="https://twitter.com/">
                  <i className="fab fa-twitter" />
                </NavLink>
                <NavLink className="btn btn-outline-primary btn-square me-3" to="https://www.instagram.com/">
                  <i className="fab fa-instagram" />
                </NavLink>
                <NavLink className="btn btn-outline-primary btn-square" to="https://www.linkedin.com/">
                  <i className="fab fa-linkedin-in" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {/* Feature Start */}
        <div className="container-fluid bg-primary feature ">
          <div className="container pt-5">
            <div className="row g-5">
              <div
                className="col-lg-6 align-self-center mb-md-5 pb-md-5 wow fadeIn"
                data-wow-delay="0.3s"
              >
                <div className="btn btn-sm border rounded-pill text-white px-3 mb-3">
                  Why Choose Us
                </div>
                <h1 className="text-white mb-4">
                  We're Best in AI Industry with 10 Years of Experience
                </h1>
                <p className="text-light mb-4">
                  It offers unparalleled AI-driven content creation, providing effortless generation of high-quality articles. With customizable options, built-in quality assurance, and scalability, we streamline your content creation process, saving time and resources. Our dedicated team ensures innovative solutions that exceed expectations. Join thousands of satisfied users and experience the future of content creation with Wordsmith Pro today.
                </p>
                
                <div className="row g-4 pt-3">
                  <div className="col-sm-6">
                    <div
                      className="d-flex rounded p-3"
                      style={{ background: "rgba(256, 256, 256, 0.1)" }}
                    >
                      <i className="fa fa-home fa-3x text-white" />
                      <div className="ms-3">
                        <h2 className="text-white mb-0" data-toggle="counter-up">
                          999+
                        </h2>
                        <p className="text-white mb-0">Happy Clients</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      className="d-flex rounded p-3"
                      style={{ background: "rgba(256, 256, 256, 0.1)" }}
                    >
                      <i className="fa fa-home fa-3x text-white" />
                      <div className="ms-3">
                        <h2 className="text-white mb-0" data-toggle="counter-up">
                          90+
                        </h2>
                        <p className="text-white mb-0">Project Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 align-self-end text-center text-md-end wow fadeIn"
                data-wow-delay="0.5s"
              >
                <img className="img-fluid" src={featureImg} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* Feature End */}
      </>

    </>

  )
}

export default AboutLayout
