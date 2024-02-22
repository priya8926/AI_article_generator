import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

function Subscription() {
    

    const handleBtnClick = () => {
       
    }
    return (
        <>
            <section>
                <div className="container mt-5">
                    <h2 className='text-center mb-4'>Upgrade your profile </h2>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col">
                                <div className=" card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$0/month</h5>
                                        <p className="card-text mt-4"> </p>
                                        <ul>
                                            <li>20 Article Generation: Subscribers can generate 20 articles without any restrictions on length or frequency.</li>
                                            <li>Transparent Pricing: Clear pricing model with no hidden fees, ensuring subscribers know exactly what they're getting.</li>
                                            <li>Revolutionize Content Creation: Join a community of satisfied subscribers and revolutionize the content creation process with AI-powered tools.</li>
                                        </ul>
                                        <div>
                                            <NavLink to="/signup" >
                                                <button className="btn btn-primary upgrade-btn" onClick={handleBtnClick}>Free signup</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className="card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$9.99/month</h5>
                                        <p className="card-text mt-4"></p>
                                        <ul>
                                            <li>50 Article Generation: Subscribers can generate 50 articles without any restrictions on length or frequency.</li>
                                            <li>Customization Options: Access to advanced customization options for specifying parameters such as topic, length, tone, and style for each article.</li>
                                            <li>Enhanced Content Quality: Premium AI models and advanced language processing algorithms ensure articles of exceptional quality and relevance.</li>
                                        </ul>
                                        <div>
                                            <NavLink to="/payment">
                                                <button className="btn btn-primary upgrade-btn">Upgrade</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className=" card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">$19.99/month</h5>
                                        <p className="card-text mt-4"> </p>
                                        <ul>
                                            <li>Unlimited Article Generation: Subscribers can generate unlimited number of articles without any restrictions on length or frequency.</li>
                                            <li>Exclusive Templates and Formats: Subscribers have access to exclusive article templates and formatting options to streamline the content creation process.</li>
                                            <li>Priority Support: Priority customer support is provided to subscribers, addressing questions, concerns, or technical issues promptly.</li>
                                        </ul>
                                        <div>
                                            <NavLink to="/payment" >
                                                <button className="btn btn-primary upgrade-btn"> Upgrade</button>
                                            </NavLink>
                                        </div>
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
