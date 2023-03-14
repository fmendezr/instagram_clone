import { doc, setDoc } from "firebase/firestore";
import { useContext, createContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import  {db}  from "../firebase";

const DBContext = createContext();

export function useDB(){
    return useContext(DBContext)
}

export function DBProvider({children}) {

    const [loading, setLoading] = useState(false);

    const introduceNewUser = async (uid, displayName) => {
        return setDoc(doc(db, "users", uid), {
            displayName: displayName,
            firstName: "",
            lastName: "",
            description: "",
            profilePhotoURL: "",
            phoneNumber: "",
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
            {!loading && children}
        </DBContext.Provider>
    )
}