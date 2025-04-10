import React, { useState } from "react";
import Task from "./Task";
import Header from "./Header";
import { me } from "../services/UserService";
import { crearTarea, ObtenerTareas } from "../services/TaskService";

const TasksList = ({ onLogout }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      descripcion: "Comprar víveres",
      estado: "Pendiente",
      fechaCaducidad: "2025-05-01",
    },
    {
      id: 2,
      descripcion: "Estudiar React",
      estado: "Activo",
      fechaCaducidad: "2025-04-15",
    },
    {
      id: 3,
      descripcion: "Hacer ejercicio",
      estado: "Inactivo",
      fechaCaducidad: "2025-04-10",
    },
  ]);

  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    descripcion: "",
    estado: "Pendiente",
    fechaCaducidad: "",
  });

  const tareasFiltradas = filtroEstado
    ? tasks.filter((task) => task.estado === filtroEstado)
    : tasks;

  const nombreUsuario = "Juan Pérez";
  const avatarUrl = "https://i.pravatar.cc/300";

  const handleAgregarTarea = () => {
    const nueva = {
      ...nuevaTarea,
      id: Date.now(),
    };
    setTasks([...tasks, nueva]);
    setNuevaTarea({ descripcion: "", estado: "Pendiente", fechaCaducidad: "" });
    setMostrarModal(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header con botón */}
      <div className="flex justify-between items-center mb-4">
        <Header nombre={nombreUsuario} avatarUrl={avatarUrl} onLogout={onLogout}/>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setMostrarModal(true)}
        >
          + Nueva Tarea
        </button>
      </div>

      {/* Filtro */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <label className="text-sm font-medium">Filtrar Tarea Por:</label>
        <select
          className="p-2 border rounded-md"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Modal para nueva tarea */}
      {mostrarModal && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Crear Nueva Tarea</h3>

            <div className="mb-3">
              <label className="block text-sm font-medium">Descripción</label>
              <input
                type="text"
                value={nuevaTarea.descripcion}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Fecha de caducidad</label>
              <input
                type="date"
                value={nuevaTarea.fechaCaducidad}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, fechaCaducidad: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAgregarTarea}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tareasFiltradas.map((task) => (
          <Task
            key={task.id}
            descripcion={task.descripcion}
            estado={task.estado}
            fechaCaducidad={task.fechaCaducidad}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
