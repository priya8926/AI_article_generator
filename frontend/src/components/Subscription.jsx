import React from 'react'

function Subscription() {
    return (
        <>
            <section>
                <div className="container mt-5">
                    <h2 className='text-center mb-4'>Upgrade your profile </h2>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col">
                                <div className="card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$9.99/month</h5>
                                        <p className="card-text mt-4">
                                            <ul>
                                                <li>50 Article Generation: Subscribers can generate 50 articles without any restrictions on length or frequency.</li>
                                                <li>Customization Options: Access to advanced customization options for specifying parameters such as topic, length, tone, and style for each article.</li>
                                                <li>Enhanced Content Quality: Premium AI models and advanced language processing algorithms ensure articles of exceptional quality and relevance.</li>
                                            </ul>
                                        </p>
                                        <a href="#" className="btn btn-primary upgrade-btn">
                                            Upgrade
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className=" card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$19.99/month</h5>
                                        <p className="card-text mt-4">
                                            <ul>
                                                <li>100 Article Generation: Subscribers can generate 100 articles without any restrictions on length or frequency.</li>
                                                <li>Exclusive Templates and Formats: Subscribers have access to exclusive article templates and formatting options to streamline the content creation process.</li>
                                                <li>Priority Support: Priority customer support is provided to subscribers, addressing questions, concerns, or technical issues promptly.</li>
                                            </ul>
                                        </p>
                                        <a href="#" className="btn btn-primary upgrade-btn">
                                            Upgrade
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className=" card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$39.99/month</h5>
                                        <p className="card-text mt-4">
                                            <ul>
                                                <li>Unlimited Article Generation: Subscribers can generate an unlimited number of articles without any restrictions on length or frequency.</li>
                                                <li>Transparent Pricing: Clear pricing model with no hidden fees, ensuring subscribers know exactly what they're getting.</li>
                                                <li>Revolutionize Content Creation: Join a community of satisfied subscribers and revolutionize the content creation process with AI-powered tools.</li>
                                            </ul>
                                        </p>
                                        <a href="#" className="btn btn-primary upgrade-btn">
                                            Upgrade
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Subscription;
