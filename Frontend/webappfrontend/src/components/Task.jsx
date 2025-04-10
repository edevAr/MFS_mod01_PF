import React, { useState } from "react";

const Task = ({ descripcion, estado, fechaCaducidad }) => {
  const [taskState, setTaskState] = useState(estado || "Pendiente");
  const [editMode, setEditMode] = useState(false);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [editedFecha, setEditedFecha] = useState(fechaCaducidad);

  // Función para manejar el cambio de estado
  const handleStateChange = (event) => {
    setTaskState(event.target.value);
  };

  // Función para manejar el cambio de descripción
  const handleDescripcionChange = (event) => {
    setEditedDescripcion(event.target.value);
  };

  // Función para manejar el cambio de fecha de caducidad
  const handleFechaChange = (event) => {
    setEditedFecha(event.target.value);
  };

  // Función para guardar los cambios
  const saveChanges = () => {
    // Aquí podrías enviar los cambios al backend o almacenarlos en un estado global
    setEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {editMode ? (
        <>
          <input
            type="text"
            value={editedDescripcion}
            onChange={handleDescripcionChange}
            className="text-xl font-semibold mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mb-4 flex items-center">
            <label className="text-sm text-gray-600 mr-4">Estado:</label>
            <select
              value={taskState}
              onChange={handleStateChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <input
            type="date"
            value={editedFecha}
            onChange={handleFechaChange}
            className="text-sm text-gray-600 mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={saveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Guardar Cambios
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{editedDescripcion}</h3>
          <div className="mb-4 flex items-center">
            <label className="text-sm text-gray-600 mr-4">Estado:</label>
            <select
              value={taskState}
              disabled
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <p className="text-sm text-gray-600">Fecha de caducidad: {editedFecha}</p>
          <div className="mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="text-blue-500 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 2L21 10M21 10L13 18M21 10H3"
                />
              </svg>
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
