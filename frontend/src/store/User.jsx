/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const formContext = createContext();

export const FormProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState()
    
    const [paymentId, setPaymentId] = useState({
        '199': localStorage.getItem("paymentId199"),
        '499': localStorage.getItem("paymentId499")
    });
    const searchQuery = useSearchParams()[0]
    const referenceNo = searchQuery.get("reference")

    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (referenceNo) {
            const amount = localStorage.getItem("selectedAmount")
            if (amount === "199") {
                localStorage.setItem("paymentId199", referenceNo);
                setPaymentId(prev => ({ ...prev, '199': referenceNo }));
            } else if (amount === "499") {
                localStorage.setItem("paymentId499", referenceNo);
                setPaymentId(prev => ({ ...prev, '499': referenceNo }));
            }
        }
    }, [referenceNo])


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
                    Authorization: AuthenticationToken,
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
    const getArticle = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/getCategory', {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            });
            if (response.ok) {
                const data = await response.json();
                // console.log("history data", data)
                setHistory(data);
            } else {
                console.error('Failed to fetch article data');
            }
        } catch (error) {
            console.log("error fetching article")
        }
    }
    const showArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/getarticle/${id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                console.log("data", data)

            } else {
                console.error('Failed to fetch article data');
            }
        } catch (error) {
            console.log("error fetching content of the aerticle")
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
    return <formContext.Provider value={{ setTokenLocalStorage, logoutUser, isLoggedIn, AuthenticationToken, user, paymentId, setPaymentId, referenceNo ,showArticle , getArticle , title,content,history}}>
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