import { useAuth } from "./useContextAuth"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {

    const {estaLogeado} = useAuth();

    return (
        <>{(estaLogeado) ? children : <Navigate to="/login" />}</>
    )
}

export default PrivateRoute