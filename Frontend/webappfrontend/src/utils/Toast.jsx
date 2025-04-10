import React, { useEffect } from "react";

const Toast = ({ message, type, showToast, setShowToast }) => {
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // Esto ocultará el Toast después de 3 segundos.
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta.
    }
  }, [showToast, setShowToast]);

  // Función que devuelve el color según el tipo de alerta
  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    showToast && (
      <div
        className={`fixed bottom-5 right-5 p-4 rounded-md text-white shadow-lg ${getToastColor(
          type
        )}`}
      >
        <div className="flex items-center">
          <span className="mr-2 font-semibold">{message}</span>
          <button
            className="ml-auto text-white"
            onClick={() => setShowToast(false)} // Esto cierra el Toast manualmente
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default Toast;
