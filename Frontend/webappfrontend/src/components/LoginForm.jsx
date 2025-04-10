import React, { useState } from "react";

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleSubmit = (e) => {
    console.log("viene aqui")
    e.preventDefault();
    onLogin({ correo, contrasenia });
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 border rounded-md border-gray-300"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 mt-1 border rounded-md border-gray-300"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Iniciar sesión
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿No tienes cuenta?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline"
        >
          Crear cuenta
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
