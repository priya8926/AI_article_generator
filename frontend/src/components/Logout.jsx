import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { useForm } from '../store/User'

function Logout() {
    const { logoutUser } = useForm()
    useEffect(() => {
        logoutUser()
    }, [logoutUser])
    return (
        <>
            <Navigate to="/login" />
        </>
    )
}

export default Logout
