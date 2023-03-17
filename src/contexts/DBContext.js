import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, createContext } from "react";
import  { db }  from "../firebase";

const DBContext = createContext();

export function useDB(){
    return useContext(DBContext)
}

export function DBProvider({children}) {

    const introduceNewUser = (uid, displayName, firstName, lastName, description) => {
        const docRef = doc(db, "users", uid);
        return setDoc(docRef, {
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
            description: description,
            private: false,
            following: [],
            followers: [],
            posts: [],
            requests: [],
        });
    }

    const getUserInfo = (uid) => {
        const docRef = doc(db, "users", uid);
        return getDoc(docRef);
    }

    const updateUserInfo = (uid, displayName, firstName, lastName, description ) => {
        const docRef = doc(db, "users", uid);
        return updateDoc(docRef, {
            displayName,
            firstName,
            lastName,
            description,
        });
    }

    const value = {
        introduceNewUser,
        getUserInfo,
        updateUserInfo
    }

    return(
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}