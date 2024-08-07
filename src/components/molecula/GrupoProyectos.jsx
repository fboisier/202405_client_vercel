
import styles from "./GrupoProyectos.module.css"
import Proyecto from "./Proyecto"

const GrupoProyectos = ({proyectos, setProyectos, tipo, nombre}) => {
    return (
        <div className={`${styles.contenedor} col-4`}>
            <h2>{nombre}</h2>
            {
                proyectos.filter((proyecto) => proyecto.estado === tipo)
                    .map(proyecto => (
                    <Proyecto 
                        key={proyecto._id}
                        id={proyecto._id}
                        titulo={proyecto.nombre}
                        fecha={proyecto.fecha_vencimiento}
                        tipo={tipo}
                        proyectos={proyectos}
                        setProyectos={setProyectos}
                    />
                ))
            }
        
        </div>
    )
}

export default GrupoProyectos