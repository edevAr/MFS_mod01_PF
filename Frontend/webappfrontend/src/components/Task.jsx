import React, { useEffect, useState } from "react";
import {actualizarTarea } from "../services/TaskService"; 

const formatearFecha = (fecha) => {
  const d = new Date(fecha);
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate()+1)}`;
};

const Task = ({ id, titulo, descripcion, estado, fechalimite, onDelete }) => {
  console.log('cargando el componente ====', id, titulo, fechalimite);
  const [taskState, setTaskState] = useState(estado || "Pendiente");
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(titulo);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [editedFecha, setEditedFecha] = useState(formatearFecha(fechalimite));

  /*useEffect(() => {
    console.log('Fecha de edición actualizada:', editedFecha);
  }, [editedFecha]);*/
  

  

  const handleStateChange = (event) => {
    setTaskState(event.target.value);
  };

  const handleTituloChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setEditedDescripcion(event.target.value);
  };

  const handleFechaChange = (event) => {
    setEditedFecha(event.target.value);
  };

  const saveChanges = async() => {
    const usuarioId = sessionStorage.getItem('currentUserId');
    console.log('fecha de porra', id, editedTitle, editedDescripcion, taskState, editedFecha, usuarioId);
    setEditMode(false);
    const tareaActualizada = await actualizarTarea(id, editedTitle, editedDescripcion, taskState, editedFecha, usuarioId);
    console.log('la tarea actualizada es: ', tareaActualizada);
  };

  const discardChanges = () => {
    setEditedTitle(titulo);
    setEditedDescripcion(descripcion);
    setEditedFecha(fechalimite);
    setTaskState(estado);
    setEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={handleTituloChange}
            className="text-2xl font-semibold mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={editedDescripcion}
            onChange={handleDescripcionChange}
            className="text-base font-semibold mb-2 w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mb-4 flex items-center">
            <label className="text-sm text-gray-600 mr-4">Estado:</label>
            <select
              value={taskState}
              onChange={handleStateChange}
              className="text-sm bg-transparent text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>
          <input
            type="date"
            value={editedFecha}
            onChange={handleFechaChange}
            className="text-sm text-gray-600 mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => {
                saveChanges();
              }}
              
              className="text-blue-600 text-sm hover:underline focus:outline-none"
            >
              Guardar cambios
            </button>
            <button
              onClick={discardChanges}
              className="text-gray-500 text-sm hover:underline focus:outline-none"
            >
              Descartar
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-2">{editedTitle}</h3>
          <p className="text-base mb-2">{editedDescripcion}</p>
          <div className="mb-4 flex items-center">
            <label className="text-sm text-gray-600 mr-4">Estado:</label>
            <select
              value={taskState}
              disabled
              className="text-sm bg-transparent text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>
          <p className="text-sm text-gray-600">Fecha limite: {editedFecha}</p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setEditMode(true)}
              className="text-blue-600 text-sm hover:underline focus:outline-none"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-red-600 text-sm hover:underline focus:outline-none"
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
