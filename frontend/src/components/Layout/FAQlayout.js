import React from 'react'

function FAQlayout() {
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div
                        className="mx-auto text-center wow fadeIn"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 500 }}
                    >
                        <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
                            Popular FAQs
                        </div>
                        <h1 className="mb-4">Frequently Asked Questions</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="accordion" id="accordionFAQ1">
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.1s">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="false"
                                            aria-controls="collapseOne"
                                        >
                                            How to build a website?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionFAQ1"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.2s">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            How long will it take to get a new website?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionFAQ1"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.3s">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            Do you only create HTML websites?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionFAQ1"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.4s">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="true"
                                            aria-controls="collapseFour"
                                        >
                                            Will my website be mobile-friendly?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#accordionFAQ1"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="accordion" id="accordionFAQ2">
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.5s">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive"
                                            aria-expanded="false"
                                            aria-controls="collapseFive"
                                        >
                                            Will you maintain my site for me?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFive"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFive"
                                        data-bs-parent="#accordionFAQ2"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.6s">
                                    <h2 className="accordion-header" id="headingSix">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix"
                                            aria-expanded="false"
                                            aria-controls="collapseSix"
                                        >
                                            I’m on a strict budget. Do you have any low cost options?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSix"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSix"
                                        data-bs-parent="#accordionFAQ2"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.7s">
                                    <h2 className="accordion-header" id="headingSeven">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSeven"
                                            aria-expanded="false"
                                            aria-controls="collapseSeven"
                                        >
                                            Will you maintain my site for me?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSeven"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSeven"
                                        data-bs-parent="#accordionFAQ2"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeIn" data-wow-delay="0.8s">
                                    <h2 className="accordion-header" id="headingEight">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEight"
                                            aria-expanded="false"
                                            aria-controls="collapseEight"
                                        >
                                            I’m on a strict budget. Do you have any low cost options?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseEight"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingEight"
                                        data-bs-parent="#accordionFAQ2"
                                    >
                                        <div className="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed
                                            sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit
                                            rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FAQlayout
