import { doc, setDoc } from "firebase/firestore";
import { useContext, createContext, useState } from "react";
import { Form } from "react-router-dom";
import  {db}  from "../firebase";

const DBContext = createContext();

export function useDB(){
    return useContext(DBContext)
}

export function DBProvider({children}) {

    const introduceNewUser = (uid, displayName) => {
        return setDoc(doc(db, "users", uid), {
            displayName: displayName,
            firstName: "",
            lastName: "",
            description: "",
            private: false,
            following: [],
            followers: [],
            posts: [],
            requests: [],
        });
    }

    const value = {
        introduceNewUser
    }

    return(
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}