import { useContext, createContext, useEffect, useState } from "react";
import  {auth}  from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const changeDisplayName = (newDisplayName) => {
        return updateProfile(auth.currentUser, {
            displayName: newDisplayName
        });
    }

    const updatePhoneNumber = ( phoneNumber) => {
        return updateProfile(auth.currentUser, {
            phoneNumber
        })
    }

    const sendVerificationEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsuscribe;
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        changeDisplayName,
        updatePhoneNumber,
        sendVerificationEmail
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}