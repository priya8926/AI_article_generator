import { React, useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom';

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
            console.log("RESPONSE DATA OF PAYMENT", resData)
            if (response.ok) {
                setData(resData)
                resData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deletePayment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/payment/deletePayment/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                alert("Payment deleted")
                getPayment()
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
            <section className='container h-75 mt-5 w-75' style={{ overflowY: 'scroll' }}>
                {data.length > 0 ? (
                    <table className="table table-light table-hover border-1 " style={{ border: "1px solid grey" }}>
                        <thead className='text-center' >
                            <tr>
                                <th scope="col">Email id</th>
                                <th scope="col">Payment id</th>
                                <th scope="col">Plan id</th>
                                <th scope="col">Create at</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {Array.isArray(data) &&
                                data.map((curData, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{curData.emailId}</td>
                                                <td>{curData.paymentId}</td>
                                                <td>{curData.planId}</td>
                                                <td>{curData.createdAt}</td>
                                                <td>
                                                    <Link onClick={() => deletePayment(curData._id)}>
                                                        <i className="fa-solid fa-trash"></i></Link>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No payment available</p>
                )}
            </section>
        </>
    )
}

export default PaymentHistory
