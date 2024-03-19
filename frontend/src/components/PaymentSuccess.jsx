import React, { useEffect } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useForm } from '../store/User'

function PaymentSuccess() {
    const searchQuery = useSearchParams()[0]
    const referenceNo = searchQuery.get("reference")
    const { AuthenticationToken } = useForm()

    const selectedAmount = localStorage.getItem("selectedAmount");
    console.log("Selected Amount:", selectedAmount);

    const subscription = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/subscription`, {
                method: "POST",
                headers: {
                    Authorization: AuthenticationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedAmount, referenceNo })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Subscription saved:", data);

            }
        } catch (error) {
            console.log(error)
        }
    }
    const createSubscription = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/createSubscription', {
                method: 'POST',
                headers: {
                    Authorization: AuthenticationToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedAmount })
            });
            if (response.ok) {
                const data = await response.json()
                console.log("subscription created 111111111111111111", data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        createSubscription()
        subscription();
    }, [])
    return (
        <>
            <div>
                <div className="container text-center mt-5 mb-5">
                    <img src="https://i.pinimg.com/originals/74/2f/7e/742f7ea29cbfd7fd3f4848f17e621070.gif" alt="" style={{
                        height: "30vh"
                    }} />
                    <h5>Payment Successfull</h5>
                    <p>Refrence no: {referenceNo}</p>
                    <NavLink to="/home"><button className='btn btn-primary'>Goto Home page</button></NavLink>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess
