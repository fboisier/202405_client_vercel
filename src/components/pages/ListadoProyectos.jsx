import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import GrupoProyectos from "../molecula/GrupoProyectos";
import { customAxios } from "../../handlers/api";

const ListadoProyectos = () => {

    const [proyectos, setProyectos] = useState([])

    useEffect(() => {
        const obtenerProyectos = async () => {
            const { data } = await customAxios('get', '/api/v1/proyectos');
            setProyectos(data);
        }
        obtenerProyectos();
    }, [])

    return (
        <>
            <div className="row">
                <GrupoProyectos proyectos={proyectos} setProyectos={setProyectos} tipo="BACK" nombre="Backlog" />
                <GrupoProyectos proyectos={proyectos} setProyectos={setProyectos} tipo="PROG" nombre="In Process"/>
                <GrupoProyectos proyectos={proyectos} setProyectos={setProyectos} tipo="COMP" nombre="Completed"/>
            </div>


            <Link to="/projects/new" className="btn btn-primary mt-5">Crear Proyecto</Link>
        </>
    )
}

export default ListadoProyectos