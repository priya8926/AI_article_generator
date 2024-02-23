import { createContext, useContext, useState } from "react";

export const formContext = createContext();

export const FormProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    let isLoggedIn = !!token // true if token exixts
    console.log("token : ", token)
    console.log("is logged in ", isLoggedIn)

    // to store the token in local storage
    const setTokenLocalStorage = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    }

    // logout functionality
    const logoutUser = ()=>{
        setToken("")
        return localStorage.removeItem("token")
    }
    return <formContext.Provider value={{ setTokenLocalStorage ,logoutUser,isLoggedIn}}>
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