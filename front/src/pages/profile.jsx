import { useContext } from "react"
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate()
    const {user}=useContext(UserContext)

    if (!user) {
        return navigate('/connexion')
    }

    return <p>{user.username}</p>
}