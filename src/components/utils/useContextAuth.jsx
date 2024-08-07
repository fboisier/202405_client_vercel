import { createContext, useState, useContext } from 'react';

// Crear el contexto
const ContextoAuth = createContext();

// Proveedor del contexto
const ProveedorAuth = ({ children }) => {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null);
    const [estaLogeado, setEstaLogeado] = useState(!!usuario);

    const objectoContexto = {
        usuario,
        setUsuario,
        estaLogeado,
        setEstaLogeado
    }

    return (
        <ContextoAuth.Provider value={objectoContexto}>
            {children}
        </ContextoAuth.Provider>
    );
};

// Hook para usar el contexto
const useAuth = () => {
    return useContext(ContextoAuth);
};

export { ProveedorAuth, useAuth };