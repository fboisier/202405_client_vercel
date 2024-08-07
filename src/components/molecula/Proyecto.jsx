import styles from "./Proyecto.module.css"
import axios from "axios"
import Swal from 'sweetalert2'
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const Proyecto = ({id, titulo, fecha, tipo, proyectos, setProyectos}) => {

    const handleUpdate = () => {

        const actualizarProyecto = async () => {
            try {
                const tipoDestino = tipo === "BACK" ? tipo = "PROG" : tipo = "COMP";
                const { data } = await axios.put(`/api/v1/proyectos/${id}`, {estado: tipoDestino});
                
                setProyectos([ ...proyectos.filter(proyecto => proyecto._id !== id), data ])
            }
            catch (error) {
                console.log(error);
            }
        }
        actualizarProyecto();
    }


    const eliminarProyecto = async (id) => {
        try {
            await axios.delete(`/api/v1/proyectos/${id}`);
            setProyectos(proyectos.filter(proyecto => proyecto._id !== id));
        } catch (error) {
            Swal.fire({
                title: "Ups un error",
                text: error.response.data.message,
                icon: "error"
            });
        }
    };

    const preguntarEliminar = () => {
        Swal.fire({
            title: "Estas seguro?",
            text: `Estas a punto de eliminar el proyecto. ${titulo}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!!!!",
            cancelButtonText: "Cancelar"

        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProyecto(id);
            }
        });
    }


    return (
        <div className={`${styles.contenedor} card`}>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{moment(fecha, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}</p>
                
                {  tipo === "BACK" && <button className="btn btn-warning" onClick={handleUpdate}>Comenzar proyecto</button>} 
                {  tipo === "PROG" && <button className="btn btn-success" onClick={handleUpdate}>Mover proyecto</button>} 
                {  tipo === "COMP" && <button className="btn btn-danger" onClick={preguntarEliminar}>Eliminar proyecto</button>} 

            </div>
        </div>
    )
}

export default Proyecto