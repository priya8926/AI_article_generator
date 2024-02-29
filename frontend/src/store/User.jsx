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

    // Function to send payment ID to backend
    const sendPaymentIdToBackend = async (paymentId) => {
        try {
            if (!paymentId) {
                throw new Error("Payment ID is required");
            }
            const response = await fetch(`http://localhost:8083/api/paymentid`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentId })
            })
            if (response.ok) {
                console.log("payment id sent to backend successfully")
            } else {
                console.log("Failed to store payment ID")
            }
        } catch (error) {
            console.log(error, "error to the send the payment in backend")
        }
    }
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
    useEffect(() => {
        // Send the payment ID to the backend when it's available
        if (paymentId) {
            sendPaymentIdToBackend(paymentId);
        }
    }, [paymentId]);


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
    return <formContext.Provider value={{ setTokenLocalStorage, logoutUser, isLoggedIn, AuthenticationToken, user, paymentId, setPaymentId, referenceNo }}>
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