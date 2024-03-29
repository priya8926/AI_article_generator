import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from '../store/User'

function Subscription() {
    const { isLoggedIn, user, paymentId, setPaymentId ,AuthenticationToken} = useForm()
    const Navigate = useNavigate();
    const[planId199 , setPlanId199] = useState()
    const[planId499 , setPlanId499] = useState()

    const userPlanId = async()=>{
        const response = await fetch("http://localhost:8083/api/user",{
            method: "GET",
            headers: {
                Authorization : AuthenticationToken,
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            const data = await response.json()
            console.log("user's details... " , data.userData)
            if(data.userData.planId === "plan_Nnj0ceCKrBcnZI"){
                setPlanId499(data.userData.planId)
            }else{
                setPlanId199(data.userData.planId)
            }
        }
    }
    
    useEffect(() => {
        if (isLoggedIn === false) {
            Navigate('/')
        }
        userPlanId()
    }, [isLoggedIn])
    const handleBtnClick = async (amount) => {
        try {
            const response = await fetch(`http://localhost:8083/api/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("data :", data)

                const keyResponse = await fetch(`http://localhost:8083/api/getkey`, {
                    method: "GET"
                })
                if (keyResponse.ok) {
                    const key = await keyResponse.json();

                    const options = {
                        key: key.key, // Enter the Key ID generated from the Dashboard
                        amount: data.amount,
                        currency: "INR",
                        name: user.username,
                        description: "Payment Test Transaction",
                        image: "https://avatars.githubusercontent.com/u/135525235?s=400&u=fc8738b279e32358b3e0906b049e635bab1f7373&v=4",
                        order_id: data.id,
                        callback_url: "http://localhost:8083/api/paymentVerification",
                        prefill: {
                            name: user.username,
                            email: user.email,
                            contact: user.phone,
                        },
                        notes: {
                            address: "Razorpay Corporate Office"
                        },
                        theme: {
                            color: "#0d6efd"
                        }
                    };

                    const razor = new window.Razorpay(options);
                    razor.open();

                    localStorage.setItem("selectedAmount", amount)

                    razor.on('payment.success', async function (paymentData) {
                        setPaymentId(prev => ({ ...prev, [amount]: paymentData.paymentId }))

                    })
                }
            } else {
                console.error('Failed to create subscription:', response.statusText);
            }

        } catch (error) {
            console.log("error in payment", error);
        }
    }
    return (
        <>
            <section>
                <div className="container-fluid mb-5 bg-light">
                    <h2 className='text-center mb-4 pt-5'>Upgrade your profile </h2>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-lg-4 col-md-6 col-sm-12 md-10 wow fadeIn" data-wow-delay="0.1s">
                                <div className="service-item d-flex flex-column justify-content-center text-start rounded h-100">
                                    <h5 className="card-title text-center ">₹0/month</h5>
                                    <p>
                                        <ul>
                                            <li>20 Article Generation: Subscribers can generate 20 articles without any restrictions on length or frequency.</li>
                                            <li>Transparent Pricing: Clear pricing model with no hidden fees, ensuring subscribers know exactly what they're getting.</li>
                                            <li>Revolutionize Content Creation: Join a community of satisfied subscribers and revolutionize the content creation process with AI-powered tools.</li>
                                        </ul>
                                    </p>
                                    <NavLink >
                                        <button className='btn btn-primary upgrade-btn disabled  mx-5'>Your current plan</button>
                                    </NavLink>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 wow fadeIn" data-wow-delay="0.3s">
                                <div className="service-item d-flex flex-column justify-content-center text-start rounded h-100" >
                                    <h5 className="card-title text-center">₹199/month</h5>
                                    <p>
                                        <ul>
                                            <li>50 Article Generation: Subscribers can generate 50 articles without any restrictions on length or frequency.</li>
                                            <li>Customization Options: Access to advanced customization options for specifying parameters such as topic, length, tone, and style for each article.</li>
                                            <li>Enhanced Content Quality: Premium AI models and advanced language processing algorithms ensure articles of exceptional quality and relevance.
                                            </li>
                                        </ul>
                                    </p>
                                    <div>
                                        <NavLink >
                                            <button className="btn btn-primary upgrade-btn  mx-5 " onClick={(event) => handleBtnClick(199, event)} disabled={planId199}> {planId199 ? 'Your Current Plan' : 'Upgrade'}</button>
                                        </NavLink>
                                        {/* <NavLink >
                                            <button className="btn btn-primary upgrade-btn  mx-5 " onClick={(event) => handleBtnClick(199, event)} disabled={paymentId['199']}> {paymentId['199'] ? 'Your Current Plan' : 'Upgrade'}</button>
                                        </NavLink> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 wow fadeIn" data-wow-delay="0.5s">
                                <div className="service-item d-flex flex-column justify-content-center text-start rounded "  >
                                    <h5 className="card-title text-center">₹499/month</h5>
                                    <p>
                                        <ul>
                                            <li>Unlimited Article Generation: Subscribers can generate unlimited number of articles without any restrictions on length or frequency.</li>
                                            <li>Exclusive Templates and Formats: Subscribers have access to exclusive article templates and formatting options to streamline the content creation process.</li>
                                            <li>Priority Support: Priority customer support is provided to subscribers, addressing questions, concerns, or technical issues promptly.</li>
                                        </ul>
                                    </p>
                                    <div>
                                        <NavLink  >
                                            <button className="btn btn-primary upgrade-btn mx-5 " onClick={(event) => handleBtnClick(499, event)} disabled={planId499}> {planId499 ? 'Your Current Plan' : 'Upgrade'}</button>
                                        </NavLink>
                                        {/* <NavLink  >
                                            <button className="btn btn-primary upgrade-btn mx-5 " onClick={(event) => handleBtnClick(499, event)} disabled={paymentId['499']}> {paymentId['499'] ? 'Your Current Plan' : 'Upgrade'}</button>
                                        </NavLink> */}
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
