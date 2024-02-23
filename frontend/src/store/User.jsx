import { createContext, useContext, useState } from "react";

export const formContext = createContext();

export const FormProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    // to store the token in local storage
    const setTokenLocalStorage = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    }
    return <formContext.Provider value={{ setTokenLocalStorage }}>
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