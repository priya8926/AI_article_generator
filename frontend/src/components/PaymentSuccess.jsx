import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

function PaymentSuccess() {
    const searchQuery = useSearchParams()[0]
    const referenceNo = searchQuery.get("reference")
    return (
        <>
            <div>
                <div className="container text-center mt-5">
                    <img src="https://i.pinimg.com/originals/74/2f/7e/742f7ea29cbfd7fd3f4848f17e621070.gif" alt="" style={{
                        height: "30vh"
                    }} />
                    <h5>Payment Successfull</h5>
                    <p>Refrence no: {referenceNo}</p>
                    <NavLink to = "/home"><button className='btn btn-primary'>Goto Home page</button></NavLink>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess
