import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { useForm } from '../store/User';

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const { setTokenLocalStorage } = useForm();
    const InputEvent = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(`http://localhost:8083/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const data = await response.json()
                console.log("response from login", data)
                setTokenLocalStorage(data.token)
                setUser({
                    email: "",
                    password: ""
                })
                alert("Login successful")
                navigate("/home")
            } else {
                alert("invalid credential")
            }
        } catch (error) {
            console.log("Error during login ", error)
        }
    }
    const visibility = () => {
        setShowPassword(!showPassword)
    }
    return (
        <>
            <section>
                <main>
                    <div className="section_registration">
                        <div className='container grid grid-two-cols'>
                            {/* registration form */}
                            <div className="registration-form">
                                <h1 className='main-heading mb-'>Login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email: </label>
                                        <input type="email" name='email' placeholder=' enter your email' id='email' required value={user.email} onChange={InputEvent} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password: </label>
                                        <p className='password'>
                                            <input type={showPassword ? "text" : "password"} autoComplete='off' placeholder=' enter your password' name='password' id='password' required value={user.password} onChange={InputEvent} />
                                            <span className="toggle-password " onClick={visibility}>
                                                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='d-flex'>
                                        <button type='submit' className='btn btn-primary'>Login Now</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Login
