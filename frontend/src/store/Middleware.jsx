import { createContext, useContext } from "react";

export const formContext = createContext();

export const formProvider = ({childern}) =>{

    return <formContext.Provider value={{}}>
        {childern}
    </formContext.Provider>
}

export const useForm = ()=>{
    const formContextValue = useContext(formContext)
    if(!formContextValue){
        throw new Error("useAuth used outside of the provider")
    }
    return formContextValue
}