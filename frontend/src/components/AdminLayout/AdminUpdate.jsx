import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { useParams } from 'react-router-dom';

function AdminUpdate() {
    const params = useParams()
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        clickCount: ""
    });

    const {AuthenticationToken} = useForm()
    const getSingleUserData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/users/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSingleUserData(params.id)
    }, [])
    const handleChange = (e) => {
        setUser({
            ...user ,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(`http://localhost:8083/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                alert("Updated successfully")
                window.location.replace("/admin/users");
            }
            else {
                alert("Not Updated")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section>
                <div>
                    <h2>Update user data</h2>
                </div>
                <div className="container grid grid-two-cols">
                    <section>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Username :
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    name='username'
                                    onChange={handleChange}
                                    value={user.username}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email :
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name='email'
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Phone :
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name='phone'
                                    onChange={handleChange}
                                    value={user.phone}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Clickcount :
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name='clickCount'
                                    onChange={handleChange}
                                    value={user.clickCount}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>

                    </section>
                </div>
            </section>
        </>
    )
}

export default AdminUpdate
