import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from '../store/User'

function Subscription() {
    const { isLoggedIn } = useForm()
    const Navigate = useNavigate();
    // const [amount, setAmount] = useState(199)
    useEffect(() => {
        if (isLoggedIn === false) {
            Navigate('/')
        }
    }, [isLoggedIn])
    const handleBtnClick = async (amount) => {
        try {
            const response = await fetch(`http://localhost:8083/api/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                    console.log("key ", key)

                    const options = {
                        key: key.key, // Enter the Key ID generated from the Dashboard
                        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "priya",
                        description: "Payment Test Transaction",
                        image: "https://avatars.githubusercontent.com/u/135525235?s=400&u=fc8738b279e32358b3e0906b049e635bab1f7373&v=4",
                        order_id: data.id,
                        callback_url: "http://localhost:8083/api/paymentVerification",
                        prefill: {
                            name: "priya patel",
                            email: "priya.patel@example.com",
                            contact: "9000090000"
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
                }
            }
        } catch (error) {
            console.log("error in payment", error);
        }
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
                                        <h5 className="card-title">₹0/month</h5>
                                        <p className="card-text mt-4"> </p>
                                        <ul>
                                            <li>20 Article Generation: Subscribers can generate 20 articles without any restrictions on length or frequency.</li>
                                            <li>Transparent Pricing: Clear pricing model with no hidden fees, ensuring subscribers know exactly what they're getting.</li>
                                            <li>Revolutionize Content Creation: Join a community of satisfied subscribers and revolutionize the content creation process with AI-powered tools.</li>
                                        </ul>
                                        <div>
                                            <NavLink>
                                                <button className="btn btn-primary upgrade-btn disabled" >Your Current plan</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className="card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">₹199/month</h5>
                                        <p className="card-text mt-4"></p>
                                        <ul>
                                            <li>50 Article Generation: Subscribers can generate 50 articles without any restrictions on length or frequency.</li>
                                            <li>Customization Options: Access to advanced customization options for specifying parameters such as topic, length, tone, and style for each article.</li>
                                            <li>Enhanced Content Quality: Premium AI models and advanced language processing algorithms ensure articles of exceptional quality and relevance.</li>
                                        </ul>
                                        <div>
                                            <NavLink >
                                                <button className="btn btn-primary upgrade-btn" onClick={() => handleBtnClick(199)}>Upgrade</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col">
                                <div className=" card card-upgrade" >
                                    <div className="card-body">
                                        <h5 className="card-title">₹499/month</h5>
                                        <p className="card-text mt-4"> </p>
                                        <ul>
                                            <li>Unlimited Article Generation: Subscribers can generate unlimited number of articles without any restrictions on length or frequency.</li>
                                            <li>Exclusive Templates and Formats: Subscribers have access to exclusive article templates and formatting options to streamline the content creation process.</li>
                                            <li>Priority Support: Priority customer support is provided to subscribers, addressing questions, concerns, or technical issues promptly.</li>
                                        </ul>
                                        <div>
                                            <NavLink  >
                                                <button className="btn btn-primary upgrade-btn" onClick={() => handleBtnClick(499)}> Upgrade</button>
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
