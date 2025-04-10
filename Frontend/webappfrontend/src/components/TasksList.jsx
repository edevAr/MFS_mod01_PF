import React, { useState } from "react";
import Task from "./Task";
import Header from "./Header";

const TasksList = () => {
  // Datos de ejemplo
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

  const [filtroEstado, setFiltroEstado] = useState(""); // Estado para el filtro

  // Filtrar tareas según el estado seleccionado
  const tareasFiltradas = filtroEstado
    ? tasks.filter((task) => task.estado === filtroEstado)
    : tasks;

  const nombreUsuario = "Juan Pérez";
  const avatarUrl = "https://i.pravatar.cc/300";

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Agregar el Header aquí */}
      <Header nombre={nombreUsuario} avatarUrl={avatarUrl} />
      <h2 className="text-2xl font-semibold text-center mb-6">Mis Tareas</h2>

      {/* Filtro de estado */}
      <div className="mb-4 flex justify-end">
        <select
          className="p-2 border rounded-md"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)} // Cambiar el filtro
        >
          <option value="">Filtrar por estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="">Todas</option> {/* Opción para ver todas las tareas */}
        </select>
      </div>

      {/* Mostrar las tareas filtradas */}
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
