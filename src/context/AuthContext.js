import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscriberUserAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return () => {
            // cleanup
            unsubscriberUserAuth();
        }
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        currentUser,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}