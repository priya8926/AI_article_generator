import React from 'react'
// import Loading from './Loading';
import { NavLink } from 'react-router-dom'
import { useForm } from '../store/User'

function Navbar() {
    const { isLoggedIn } = useForm()
    
    return (
        <>
            <section>
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid  ms-2">
                            <NavLink className="navbar-brand" to="#">
                                AIArticle
                            </NavLink>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {isLoggedIn ? (
                                        <>


                                            <li className="nav-item">
                                                <NavLink className="nav-link active" aria-current="page" to="/home">
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/about">
                                                    About
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/contact">
                                                    Contact
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <div className='upgrade d-flex'>
                                                    <NavLink to="/logout"><button className="btn btn-primary mx-1">Logout</button></NavLink>

                                                    <NavLink to="/subscription"><button className='btn btn-primary mx-1'>Upgrade plan</button></NavLink>
                                                    <NavLink to="/signup"><button className='btn btn-primary mx-1'>Signup</button></NavLink>
                                                </div>

                                            </li>
                                        </>
                                    ) : (

                                        <li className="nav-item ">
                                            <div className='signup d-flex'>
                                                {/* <button className="btn btn-primary mx-1">logout</button> */}
                                                <NavLink to="/signup"><button className="btn btn-primary mx-1">Signup</button></NavLink>

                                                <NavLink to="/"><button className="btn btn-primary mx-1">Login</button></NavLink>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    )
}

export default Navbar
