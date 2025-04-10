// src/services/apiService.js

const API_BASE_URL = 'http://localhost:3001'; // URL base de la API

// Función para manejar las solicitudes HTTP
const request = async (endpoint, method = 'GET', body = null) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  // Si la petición es POST, PUT o PATCH, agregar el cuerpo (body) al request
  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.json(); // Retorna la respuesta en formato JSON
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

// Crear tarea (POST)
export const crearTarea = async (titulo, descripcion, estado, fechaLimite) => {
  const body = { titulo, descripcion, estado, fechaLimite };
  return await request('/api/tasks', 'POST', body);
};

// Iniciar sesión (POST)
export const ObtenerTareas = async () => {
  return await request('/api/tasks/', 'GET');
};

