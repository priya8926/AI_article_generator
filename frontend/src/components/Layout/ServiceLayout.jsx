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
          <h1 className="mb-4">Our Excellent AI Services for Your Business</h1>
          <p className="mb-4">
          Our article generator service provides you with high-quality, customized articles tailored to your needs.Whether you need articles for your blog, website, or publication, our service ensures efficiency and effectiveness. Our articles are meticulously crafted to meet your specifications, saving you time and effort while maintaining excellent quality.
          </p>
        </div>
        <div className="col-lg-7">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="row g-4 mb-3">
                <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                      <i class="fa-solid fa-robot fa-2x"></i>
                    </div>
                    <h5 className="mb-2">Robotic Automation</h5>
                    <p>
                    Utilize our advanced AI algorithms to effortlessly generate high-quality articles, blog posts, product descriptions, and more on any topic
                    </p>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                    <i class="fa-solid fa-download fa-2x"></i>
                    </div>
                    <h5 >Download Articles</h5>
                    <p>
                    You can also download articles once you add your keyword. just scroll down to the bottom of the page and you will see a button called save just click it and download articles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 pt-md-4">
              <div className="row g-4">
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                    <i class="fa-solid fa-globe fa-2x"></i>
                    </div>
                    <h5 className="mb-3">Multiple Language support</h5>
                    <p>
                    You can generate articles in many other languages you can see by changing language from english to an other.
                    </p>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.7s">
                  <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                    <div className="service-icon btn-square">
                    <i class="fa-solid fa-list fa-2x"></i>
                    </div>
                    <h5 className="mb-3">Multiple Category</h5>
                    <p>
                      You have multiple Category options for article creation.you can choose any category based on your article.Also you can search your article by title or words.
                    </p>
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
