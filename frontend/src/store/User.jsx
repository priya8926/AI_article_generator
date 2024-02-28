import { createContext, useContext, useEffect, useState } from "react";

export const formContext = createContext();

export const FormProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState()
    let isLoggedIn = !!token // true if token exixts
    console.log("token : ", token)
    console.log("is logged in ", isLoggedIn)

    const AuthenticationToken = `Bearer ${token}`

    // to store the token in local storage
    const setTokenLocalStorage = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    }
    // to get current logged in user data 
        const getUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8083/api/user`, {
                    method: "GET",
                    headers: {
                        Authorization: AuthenticationToken
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log("logged in user data", data.userData)
                    setUser(data.userData)
                }
            } catch (error) {
                console.log(error, "error fetching user data")
            }
        }
       useEffect(() => {
        if (isLoggedIn) {
            getUserData();
        }
    }, [isLoggedIn])

    // logout functionality
    const logoutUser = () => {
        setToken("")
        return localStorage.removeItem("token")
    }
    return <formContext.Provider value={{ setTokenLocalStorage, logoutUser, isLoggedIn, AuthenticationToken , getUserData }}>
        {children}
    </formContext.Provider>
}

export const useForm = () => {
    const formContextValue = useContext(formContext)
    if (!formContextValue) {
        throw new Error("useForm used outside of the provider")
    }
    return formContextValue
}