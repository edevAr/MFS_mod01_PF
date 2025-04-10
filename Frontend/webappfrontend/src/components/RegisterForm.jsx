import React, { useState } from "react";

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 mt-1 border rounded-md border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 border rounded-md border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Crear cuenta
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:underline"
        >
          Iniciar sesión
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
