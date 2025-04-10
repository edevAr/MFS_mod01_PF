import React, { useState } from "react";
import Task from "./Task";

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

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Mis Tareas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task) => (
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
