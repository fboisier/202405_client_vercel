import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as Yup from "yup";
import Loading from "../utils/Loading";
import styles from "./Login.module.css";
import { useAuth } from "../utils/useContextAuth";
import { customAxios } from "../../handlers/api";

const LoginValidacionSchema = Yup.object().shape({
    email: Yup.string()
        .email('Formato de email no válido')
        .required('Este campo es requerido.'),
    password: Yup.string()
        .required('Este campo es requerido')
});

const Login = () => {

    const navigate = useNavigate();
    const {setUsuario, setEstaLogeado} = useAuth();

    const initialValues = {
        email: '',
        password: '',
    }

    const handleSubmit = (values, { setSubmitting }) => {

        const loginUser = async () => {
            try {
                const { data } = await customAxios('post', '/api/v1/auth/login', values);
                console.log(data);
                setUsuario(data.usuario)
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                setEstaLogeado(true);

                Swal.fire({
                    title: "Bienvenido!",
                    text: `Ya estás en el sistema.`,
                    icon: "success"
                });

                navigate('/');
            }
            catch (error) {
                console.log(error.response.data);
                Swal.fire({
                    title: "Error!",
                    text: error.response.data.msg,
                    icon: "error"
                });
                
            }
            setSubmitting(false);
        }
        loginUser();
    }


    return (
        <>
            <div className={styles.formulario}>
                <span>Login para entrar al sistema</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginValidacionSchema}
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
                                                <label htmlFor="email" className="col-form-label">Email</label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="offset-3 col-9">
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-danger ms-1 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-3">
                                                <label htmlFor="password" className="form-label">Contraseña</label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    type="password"
                                                    min={new Date().toISOString().slice(0, 10)}
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                />
                                            </div>
                                        </div>
                                        <div className="offset-3 col-9">
                                            <ErrorMessage
                                                name="password"
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
                                            Ingresar al Sistema!
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

export default Login