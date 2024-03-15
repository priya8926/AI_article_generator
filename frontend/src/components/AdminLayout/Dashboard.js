/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink, Navigate,Outlet } from 'react-router-dom'
import { useForm } from '../../store/User';

function Dashboard() {
    const { user, isLoading } = useForm();
    console.log("layout user : ", user)

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (user && !user.isAdmin) {
        return <Navigate to="/" />
    }
    return (
        <>
            <div className='d-flex h-100'>

                <div className="bg-light text-white h-100 border-end text-align-start px-3" style={{ width: "24%" }}>
                    <div className="d-flex flex-column p-3">
                        <nav>
                            <ul className="nav flex-column mt-3">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/users">
                                        <i className="fa-solid fa-user fa-lg mx-2 "></i>Users</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/payments">
                                        <i className="fa-solid fa-money-check fa-lg mx-2"></i>Payments</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/contact">
                                        <i className="fa-regular fa-id-card fa-lg mx-2"></i>Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/subscription">
                                        <i className="fa-solid fa-hand-pointer fa-lg mx-2"></i>Subscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/category/addcategory">
                                        <i className="fa-solid fa-list fa-lg mx-2"></i>Category</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/language/addLanguage">
                                    <i className="fa-solid fa-globe fa-lg mx-2"></i>Language</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/length/addLength">
                                    <i className="fa-solid fa-arrows-up-down fa-lg mx-2"></i>Length</NavLink>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Dashboard
