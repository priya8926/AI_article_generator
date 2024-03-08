import React from 'react'
// import Loading from './Loading';
import { NavLink } from 'react-router-dom'
import { useForm } from '../store/User'

function Navbar() {
    const { isLoggedIn } = useForm()

    return (
        <>
            <div className="container-fluid sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark p-0">
                        <NavLink to="#" className="navbar-brand">
                            <h1 className="text-white">AI<span className="text-dark"></span>Article</h1>
                        </NavLink>
                        <button type="button" className="navbar-toggler ms-auto me-0" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            {isLoggedIn ? (
                                <>
                                    <div className="navbar-nav ms-auto">
                                        <NavLink to="/home" className="nav-item nav-link active">Home</NavLink>
                                        <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                                        <NavLink to="/services" className="nav-item nav-link">Services</NavLink>
                                        <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                                        <NavLink to="/subscription" className="nav-item nav-link">Upgrade plan</NavLink>
                                        <NavLink to="/signup" className="nav-item nav-link">Signup</NavLink>
                                        <NavLink to="/logout" className="nav-item nav-link">Logout</NavLink>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="navbar-nav ms-auto">
                                        <NavLink to="/signup" className="nav-item nav-link">Signup</NavLink>
                                        <NavLink to="/" className="nav-item nav-link">Login</NavLink>
                                    </div>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            <div className="container-fluid pt-5 bg-primary hero-header ">
                <div className="container pt-4"></div>
            </div>
        </>
    )
}

export default Navbar
