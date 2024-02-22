import { createContext, useContext, useEffect, useState } from "react";

export const formContext = createContext();

export const FormProvider = ({ children }) => {
    return <formContext.Provider value={{ }}>
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