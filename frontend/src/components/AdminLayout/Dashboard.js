import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <header>
                <div className="conatiner">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users"> <i className="fa-solid fa-user"></i> users </NavLink> </li>
                            <li><NavLink to="/admin/contacts"><i className="fa-solid fa-address-card"></i> contacts </NavLink> </li>
                            <li><NavLink to="/service"><i className="fa-solid fa-rectangle-list"></i> services </NavLink> </li>
                            <li><NavLink to="/home"><i className="fa-solid fa-house-user"></i> Home </NavLink> </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Dashboard
