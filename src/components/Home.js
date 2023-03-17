import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CreateProfile from "./CreateProfile";

export default function Home () {

    const [ displayName, setDisplayName ] = useState();  

    const { currentUser } = useAuth();

    const changeDisplayName = (newName) => {
        setDisplayName(newName);
    }

    useEffect(() => {
        const getDataFromFirebase = async () => {
            setDisplayName(currentUser.displayName)
        }
        getDataFromFirebase()
    },  [])

    return (
        <>
            <Link to={`/${displayName}`}><button>Profile</button></Link>
            <p>{currentUser.uid}</p>
            <p>{currentUser.displayName}</p>
            {  displayName === null ?  <CreateProfile firstTime={true} changeState={changeDisplayName}/> :  null}
        </>
    )
} 