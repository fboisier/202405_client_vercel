import { Navigate } from "react-router-dom";
import { useAuth } from "./useContextAuth";

const PublicRoute = ({ children }) => {

    const {estaLogeado} = useAuth();

    return (
        <>{(estaLogeado) ? <Navigate to="/" /> : children}</>
    )
}

export default PublicRoute