import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'

function AdminContact() {
    const {AuthenticationToken} = useForm()
    const [contact, setContact] = useState([])
    const getContact = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/contact`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken,
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log("contact" , data)
                setContact(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getContact()
    }, [])
    return (
        <>
            <div className='container m-5 w-100'>
                <table className="table table-light table-hover border-1 " style={{ border: "1px solid grey" }}>
                    <thead className='text-center'>
                        <tr className='text-center' >
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {contact &&
                            contact.map((curData, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{curData.username}</td>
                                            <td>{curData.email}</td>
                                            <td>{curData.subject}</td>
                                            <td>{curData.message}</td>
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

export default AdminContact
