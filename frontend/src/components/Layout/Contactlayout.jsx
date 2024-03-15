import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'

function Contactlayout() {
    const defaultContact = {
        username: "",
        email: "",
        subject: "",
        message: ""
    }
    const [contact, setContact] = useState(defaultContact)
    const { AuthenticationToken ,user} = useForm()

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (user){
            setContact({
                username : user.username,
                email : user.email,
                subject:"",
                message:""
            })
        }
    }, [user])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8083/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify(contact),
            })
            if (response.ok) {
                const data = await response.json()
                setContact(defaultContact)
                alert("message send successfully ")
            }
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <div className="container-fluid mt-5 mb-4 ">
                <div className="container">
                    <div
                        className="mx-auto text-center wow fadeIn"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 500 }}
                    >
                        <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
                            Contact Us
                        </div>
                        <h1 className="mb-4">If You Have Any Query, Please Contact Us</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="wow fadeIn" data-wow-delay="0.3s">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    value={contact.username}
                                                    onChange={handleChange}
                                                    name='username'
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    value={contact.email}
                                                    onChange={handleChange}
                                                    name='email'
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="subject"
                                                    placeholder="Subject"
                                                    value={contact.subject}
                                                    onChange={handleChange}
                                                    name='subject'
                                                />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Leave a message here"
                                                    id="message"
                                                    style={{ height: 150 }}
                                                    value={contact.message}
                                                    onChange={handleChange}
                                                    name='message'
                                                />
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contactlayout
