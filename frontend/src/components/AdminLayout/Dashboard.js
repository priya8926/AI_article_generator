/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <div className='d-flex h-100'>

                <div className="bg-light text-white h-100 border-end text-align-start px-3" style={{ width: "22%" }}>
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
                                    <NavLink className="nav-link" to="">
                                        <i className="fa-regular fa-id-card fa-lg mx-2"></i>Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="">
                                        <i className="fa-solid fa-hand-pointer fa-lg mx-2"></i>Subscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/category">
                                        <i className="fa-solid fa-list fa-lg mx-2"></i>Category</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/language">
                                    <i class="fa-solid fa-globe fa-lg mx-2"></i>Language</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/length">
                                    <i class="fa-solid fa-arrows-up-down fa-lg mx-2"></i>Length</NavLink>
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
