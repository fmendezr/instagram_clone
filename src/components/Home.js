import { useAuth } from "../contexts/AuthContext"

export default function Home () {

    const { currentUser } = useAuth();

    return (
        <>{currentUser.email}</>
    )
} 