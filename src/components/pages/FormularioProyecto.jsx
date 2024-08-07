import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { extractErrors } from '../../utils/funciones.js';
import Loading from "../utils/Loading";
import styles from "./FormularioProyecto.module.css";
import { customAxios } from "../../handlers/api.js";

const ProyectoValidacionSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'proyecto debe tener al menos 2 caracteres.')
        .max(70, 'no debe superar los 70 caracteres')
        .required('Este campo es requerido.'),
    fecha_vencimiento: Yup.date()
        .required('Este campo de fecha es requerido')
        .min(new Date(), 'la fecha no puede ser el pasado.'),
});

const FormularioProyecto = () => {

    const navigate = useNavigate();

    const initialValues = {
        nombre: '',
        fecha_vencimiento: new Date(),
    }

    const handleSubmit = (values, { setErrors, setSubmitting }) => {

        const crearProyecto = async () => {
            try {
                const { data } = await customAxios('post', '/api/v1/proyectos', values);

                Swal.fire({
                    title: "GENIAL!",
                    text: `Se ha creado el proyecto ${data.nombre} (${data._id})`,
                    icon: "success"
                });

                navigate('/');
            }
            catch (error) {
                const errors = error.response.data.errors;
                console.log(errors);
                if (error.response && error.response.data.errors) {
                    const extractedErrors = extractErrors(error.response.data.errors);
                    setErrors(extractedErrors);
                }
            }
            setSubmitting(false);
        }
        crearProyecto();
    }


    return (
        <>
            <div className={styles.formularioProyecto}>
                <span>Nuevo proyecto a crear</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ProyectoValidacionSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ isSubmitting }) => (
                            (isSubmitting)
                                ? <Loading />
                                :
                                <Form>
                                    <div className="mb-3 mt-3">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-3">
                                                <label htmlFor="nombre" className="col-form-label">Nombre</label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="nombre"
                                                    name="nombre"
                                                />
                                            </div>
                                        </div>
                                        <div className="offset-3 col-9">
                                            <ErrorMessage
                                                name="nombre"
                                                component="div"
                                                className="text-danger ms-1 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-3">
                                                <label htmlFor="fecha_vencimiento" className="form-label">Fecha vencimiento</label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    type="date"
                                                    min={new Date().toISOString().slice(0, 10)}
                                                    className="form-control"
                                                    id="fecha_vencimiento"
                                                    name="fecha_vencimiento"
                                                />
                                            </div>
                                        </div>
                                        <div className="offset-3 col-9">
                                            <ErrorMessage
                                                name="fecha_vencimiento"
                                                component="div"
                                                className="text-danger ms-1 mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className='btn btn-primary'
                                            disabled={isSubmitting}
                                        >
                                            Crear Proyecto
                                        </button>
                                    </div>
                                </Form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}

export default FormularioProyecto