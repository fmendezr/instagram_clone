import { doc, setDoc } from "firebase/firestore";
import { useContext, createContext } from "react";
import  { db }  from "../firebase";

const DBContext = createContext();

export function useDB(){
    return useContext(DBContext)
}

export function DBProvider({children}) {

    const introduceNewUser = (uid, displayName, firstName, lastName, description) => {
        return setDoc(doc(db, "users", uid), {
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

    const value = {
        introduceNewUser
    }

    return(
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}