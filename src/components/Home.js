import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export default function Home () {

    const { currentUser } = useAuth();

    return (
        <>
            <Link to={`/${currentUser.displayName}`}><button>Profile</button></Link>
        </>
    )
} 