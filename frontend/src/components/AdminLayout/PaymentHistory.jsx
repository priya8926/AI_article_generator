import { React, useEffect, useState } from 'react'
import { useForm } from '../../store/User'

function PaymentHistory() {
    const [data, setData] = useState([])
    const { AuthenticationToken } = useForm()

    const getPayment = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/payments`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            const resData = await response.json();
            console.log("RESPONSE DATA OF PAYMENT" ,  resData)
            if (response.ok) {
                setData(resData)
                resData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPayment()
    }, [])
    return (
        <>
            <section className='container mt-5 w-75'>
            {data.length > 0 ? (
                <table className="table table-light table-hover border-1 " style={{ border: "1px solid grey" }}>
                    <thead className='text-center' >
                        <tr>
                            {/* <th scope="col">Email id</th> */}
                            <th scope="col">Payment id</th>
                            <th scope="col">Create at</th>
                        </tr>
                    </thead>
                    <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {Array.isArray(data) &&
                            data.map((curData, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            {/* <td>{curData.email}</td> */}
                                            <td>{curData.razorpay_payment_id}</td>
                                            <td>{curData.createdAt}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            ):(
                <p>No payment history available</p>
            )}
            </section>
        </>
    )
}

export default PaymentHistory
