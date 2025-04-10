import React, { useState, useEffect } from "react";
import Task from "./Task";
import Header from "./Header";
import { obtenerUsuario } from "../services/UserService";
import { obtenerTareas, crearTarea, eliminarTarea } from "../services/TaskService"; 

const TasksList = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    descripcion: "",
    estado: "Pendiente",
    fechaCaducidad: "",
  });

  useEffect(() => {
    // Obtener las tareas y el usuario cuando el componente se monte
    const fetchData = async () => {
      try {
        // Obtener usuario
        const usuario = await obtenerUsuario();
        if (usuario) {
          console.log('el usuario es:', usuario);
          sessionStorage.setItem('currentUserId', usuario.id);
          setNombreUsuario(usuario.nombre);
          setAvatarUrl(usuario.avatarUrl);
        }

        // Obtener tareas
        const tareas = await obtenerTareas();
        console.log('estos son las tareas', tareas);
        setTasks(tareas);
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };

    fetchData();
  }, []); // El array vacío significa que solo se ejecutará una vez cuando el componente se monte

  const tareasFiltradas = filtroEstado
    ? tasks.filter((task) => task.estado === filtroEstado)
    : tasks;

  const handleAgregarTarea = async() => {
    const usuarioId = sessionStorage.getItem('currentUserId');
    const nueva = {
      ...nuevaTarea,
      id: Date.now(),
    };
    setTasks([...tasks, nueva]);
    setNuevaTarea({ descripcion: "", estado: "Pendiente", fechaCaducidad: "" });
    setMostrarModal(false);

    const tarea = await crearTarea(nueva.titulo, nueva.descripcion, nueva.estado, nueva.fechaCaducidad, usuarioId);
    console.log('tarea creada', tarea);
  };
  const removerTarea = async (id) => {
    const tareaEliminada = await eliminarTarea(id);
    console.log(tareaEliminada);
    console.log('vino a eliminiar', id)
    const nuevasTareas = tareasFiltradas.filter((tarea) => tarea.id !== id);
    setTasks(nuevasTareas);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header con botón */}
      <div className="flex justify-between items-center mb-4">
        <Header nombre={nombreUsuario} avatarUrl={avatarUrl} onLogout={onLogout} />
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
          className="text-sm bg-transparent text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
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
              <label className="block text-sm font-medium">Titulo</label>
              <input
                type="text"
                value={nuevaTarea.titulo}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
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
            id= {task.id}
            key={task.id}
            titulo={task.titulo}
            descripcion={task.descripcion}
            estado={task.estado}
            fechaCaducidad={task.fechalimite}
            onDelete={(id)=> removerTarea(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
