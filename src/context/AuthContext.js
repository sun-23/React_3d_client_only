import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [userAddress, setAddress] = useState('')
    const [listFileOrder, setFilesOrder] = useState([])
    const [listFileCart, setFilesCart] = useState([])

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

    useEffect(() => {
        const unsubscriberUserAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return () => {
            // cleanup
            unsubscriberUserAuth();
        }
    }, [])

    useEffect(() => {
        // effect
        var unsub = () => console.log('1');
        var unsubFileCart = () => console.log('2');
        var unsubFileOrder = () => console.log('3');
        if(currentUser){
            unsub =  db.collection("users").doc(currentUser.uid).onSnapshot(async (doc) => {
            console.log("Current data: ", await doc.data());
            setAddress(await doc.data().address);

            unsubFileCart = db.collection("cart").where("userId", "==", currentUser.uid)
                .onSnapshot(async (querySnapshot) => {
                    var filecart = []
                    //console.log('snhc', querySnapshot);
                    await querySnapshot.forEach(async (doc) => {
                        //console.log('c', doc.data().file_name)
                        filecart.push(await doc.data().file_name)
                    });
                    setFilesCart(await filecart)
                })

            unsubFileOrder = db.collection("order").where("userId", "==", currentUser.uid)
                .onSnapshot(async (querySnapshot) => {
                    var fileorder = []
                    //console.log('snho', querySnapshot);
                    await querySnapshot.forEach(async (doc) => {
                        if(doc.data().process === "processing"){
                            await doc.data().Product.map(async (model) => {
                                //console.log('o', model.file_name)
                                fileorder.push(await model.file_name)
                            }) 
                        }  
                    });
                    await setFilesOrder(fileorder);
                })
        });
        }
        return () => {
            // cleanup
            unsub()
            unsubFileCart()
            unsubFileOrder()
        }
    }, [currentUser])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        userAddress,
        listFileOrder,
        listFileCart
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}