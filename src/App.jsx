import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioProyecto from './components/pages/FormularioProyecto';
import ListadoProyectos from './components/pages/ListadoProyectos';
import Login from './components/pages/Login';
import PublicRoute from './components/utils/PublicRoute';
import PrivateRoute from './components/utils/PrivateRoute';
import { useAuth } from './components/utils/useContextAuth';
import Logout from './components/molecula/Logout';


function App() {

  const {usuario, estaLogeado } = useAuth();

  return (
    <BrowserRouter>
      <div className="container mt-3">
        <h1 className="text-center">Project Manager{ estaLogeado && `, bienvenido ${usuario.nombre}` } </h1>
        { estaLogeado && <Logout />}
        <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <ListadoProyectos />
              </PrivateRoute>
            } />
            <Route path="/projects/new" element={
              <PrivateRoute>
                <FormularioProyecto/>
              </PrivateRoute>
            }/>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
