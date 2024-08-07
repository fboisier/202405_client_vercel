import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useContextAuth";



const Logout = () => {

    const {setUsuario, setEstaLogeado} = useAuth();
    const navigate = useNavigate();
    

    const handleLogOut = () => {
        const logOutUser = async () => {
            try {
                const { data } = await axios.get('/api/v1/auth/logout');
                console.log(data);
                setUsuario(null)
                localStorage.removeItem('usuario');
                setEstaLogeado(false);
                navigate('/login');
            }
            catch (error) {
                console.log(error.response.data);
                Swal.fire({
                    title: "Error!",
                    text: error.response.data.msg,
                    icon: "error"
                });
                
            }
        }
        logOutUser();
    }

    return (
        <><button className="btn btn-danger mt-3 mb-3" onClick={handleLogOut}>LogOut</button></>
    )
}

export default Logout