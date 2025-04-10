import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TasksList from "./TasksList";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (credentials) => {
    console.log("Iniciar sesión con:", credentials);
    // Simulación de inicio de sesión correcto
    setIsLoggedIn(true);
  };

  const handleRegister = (userData) => {
    console.log("Registrar usuario con:", userData);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {isLoggedIn ? (
        <TasksList /> // Si el usuario está logueado, mostrar las tareas
      ) : isLogin ? (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthForm;
