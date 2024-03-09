import React from 'react'
import HeroImg from "../../img/hero-img.png"
import { NavLink } from 'react-router-dom'

function Hero() {
    return (
            <>
                {/* Hero Start */}
                <div className="container-fluid pt-5 bg-primary hero-header mb-5">
                    <div className="container pt-5">
                        <div className="row g-5 pt-5">
                            <div className="col-lg-6 align-self-center text-center text-lg-start mb-lg-5">
                                <div className="btn btn-sm border rounded-pill text-white px-3 mb-3 animated slideInRight">
                                    AIArticle
                                </div>
                                <h1 className="display-4 text-white mb-4 animated slideInRight">
                                The Ultimate AI Article Generator 
                                </h1>
                                <p className="text-white mb-4 animated slideInRight">
                                Take your articles from good to the best. And do it easy & fast.
                                </p>
                               
                            </div>
                            <div className="col-lg-6 align-self-end text-center text-lg-end">
                                <img className="img-fluid" src={HeroImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero End */}
            </>
    )
}

export default Hero
