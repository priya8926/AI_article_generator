
import { React, useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom';

function AdminSubscription() {
    const [data, setData] = useState([])
    const { AuthenticationToken } = useForm()

    const getAllsubscription = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/subscription`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const res = await response.json()
                setData(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteSubscription = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/subscription/deleteSubscription/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                getAllsubscription()
                alert("subscription deleted")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllsubscription()
    }, [])
    return (
        <>
            <div className='container mt-5 mb-4'>
                <table className="table table-light table-hover border-1" style={{ border: "1px solid grey", }}>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col" >Email id</th>
                            <th scope="col" >Subscription Id</th>
                            {/* <th scope="col">Plan Id</th> */}
                            <th scope="col" >Plan199</th>
                            <th scope="col" >Plan499</th>
                            <th scope="col" >Created At</th>
                            <th scope="col" >Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {
                            Array.isArray(data) &&
                            data.map((curData, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{curData.emailId}</td>
                                            <td>{curData.subscriptionId}</td>
                                            {/* <td>{curData.planId}</td> */}
                                            <td>{
                                                curData.planId === "plan_NgG9DZEKg6JtL2" ?<i className="fa-solid fa-check"></i> : ""}</td>
                                            <td> {curData.planId === "plan_Nnj0ceCKrBcnZI" ? <i className="fa-solid fa-check"></i> : ""}</td>
                                            <td>{curData.createdAt}</td>
                                            <td>
                                                <Link onClick={() => deleteSubscription(curData._id)}>
                                                    <i className="fa-solid fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminSubscription
