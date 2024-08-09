import axios from 'axios';

// Define la URL base desde las variables de entorno de Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Realiza una llamada HTTP utilizando Axios.
 *
 * @param {string} method - El método HTTP (get, post, put, delete).
 * @param {string} endpoint - El endpoint de la API.
 * @param {Object} [data=null] - Datos a enviar en el cuerpo de la solicitud.
 * @returns {Promise} - La promesa de Axios con la respuesta de la API.
 */
export const customAxios = async (method, endpoint, data = null) => {
    try {
        let optionAxios = {
            method,
            url: `${BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Para manejar cookies
        };
        if (data){
            optionAxios = {...optionAxios, data}
        }

        const response = await axios(optionAxios);        
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};