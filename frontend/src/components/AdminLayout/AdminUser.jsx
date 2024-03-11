/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link, } from 'react-router-dom'

function AdminUser() {
    const [users, setUsers] = useState([])
    const { AuthenticationToken } = useForm()

    const getAllUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/users`, {
                // 'Content-Type': 'application/json',
                method: 'GET',
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUsers(data);
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            const data = await response.json()
            console.log(`uesrs after delete ${data}`)
            alert("user deleted")
            if (response.ok) {
                getAllUserData()
            }
        } catch (error) {
            console.log(error, "user not deleted")
        }
    }
    useEffect(() => {
        getAllUserData()
    }, [])
    return (
        <>
            <section className='container mt-5 w-100'>
                <table className="table table-light table-hover border-1 " style={{ border: "1px solid grey" }}>
                    <thead className='text-center' >
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Click count</th>
                            <th scope="col">Create at</th>
                            <th scope="col">Subscription</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {
                            users.map((curData, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{curData.username}</td>
                                            <td>{curData.email}</td>
                                            <td>{curData.phone}</td>
                                            <td>{curData.clickCount}</td>
                                            <td>{curData.createdAt}</td>
                                            <td>{curData.subscription ? curData.subscription.status : 'N/A'}</td>
                                            <td>
                                                <Link to={`/admin/users/${curData._id}`} >Edit</Link>
                                            </td>
                                            <td>
                                                <Link onClick={() => { deleteUser(curData._id) }} >Delete</Link>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AdminUser
