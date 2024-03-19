import React, { useEffect } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useForm } from '../store/User'

function PaymentSuccess() {
    const searchQuery = useSearchParams()[0]
    const referenceNo = searchQuery.get("reference")
    const { AuthenticationToken } = useForm()

    const subscription = async (amount) => {
        localStorage.getItem("selectedAmount", amount)
        console.log(" selected amount", amount)
        try {
            const response = await fetch(`http://localhost:8083/api/subscription`, {
                method: "POST",
                headers: {
                    Authorization: AuthenticationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, referenceNo })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Subscription saved:", data);

            }
        } catch (error) {
            console.log(error)
        }
    }
    // const paymentId = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:8083/api/paymentid`, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: AuthenticationToken,
    //             },
    //             body: JSON.stringify(referenceNo)
    //         })
    //         if (res.ok) {
    //             const result = await res.json()
    //             console.log("resultttt : ", result);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const createSubscription = async (amount) => {
        try {
            localStorage.getItem("selectedAmount", amount)
            const response = await fetch('http://localhost:8083/api/createSubscription', {
                method: 'POST',
                headers: {
                    Authorization: AuthenticationToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            });
            if (response.ok) {
                const data = await response.json()
                console.log("subscription created", data)

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
