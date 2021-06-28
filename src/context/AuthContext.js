import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [userAddress, setAddress] = useState('')

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout() {
        return auth.signOut();
    }

    function resetpassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(async () => {
        const unsub = db;
        const unsubscriberUserAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            unsub =  db.collection("users").doc(user.uid).onSnapshot(async (doc) => {
            console.log("Current data: ", await doc.data());
            setAddress(await doc.data().address);
        });
        })
        return () => {
            // cleanup
            unsubscriberUserAuth();
            unsub();
        }
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        userAddress
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}