import React, { useState } from "react";

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!validateName(name)) {
      newErrors.name = "El nombre solo debe contener letras y espacios.";
      isValid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = "Por favor ingrese un correo electrónico válido.";
      isValid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onRegister({ name, email, password });
    }
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
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
