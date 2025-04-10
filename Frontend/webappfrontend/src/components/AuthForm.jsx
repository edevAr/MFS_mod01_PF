import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TasksList from "./TasksList";
import { iniciarSesion, crearUsuario } from "../services/UserService";
import Toast from "../utils/Toast";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin =  async (credentials) => {
    try {
      const response = await iniciarSesion(credentials.correo, credentials.contrasenia);
      if(response.token){
        sessionStorage.setItem('token', response.token);
        setIsLoggedIn(true);
        setMensaje('Inicio de sesión exitoso');
      } else {
        setMessage('¡Hubo un error al hacer la solicitud!');
        setType('error');
        setShowToast(true);
      }
    } catch (error) {
      setMessage('¡Hubo un error al hacer la solicitud!');
      setType('error');
      setShowToast(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false); // Volver a la pantalla de login
  };

  const handleRegister = async (userData) => {
    console.log("Registrar usuario con:", userData);
    try {
      const response = await crearUsuario(userData.name, userData.email, userData.password);
      if(response.usuario){
        console.log('El usuario creado es: ', response);
        setMessage('Usuario creado exitosamente');
        setType('success');
        setShowToast(true);
        
        // Cambiar a la pantalla de Login después de registrar
        switchToLogin();
      }
    } catch (error) {
      setMessage('¡Hubo un error al crear el usuario!');
      setType('error');
      setShowToast(true);
    }
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
        <TasksList onLogout={handleLogout} /> // Si el usuario está logueado, mostrar las tareas
      ) : isLogin ? (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
      )}
      {showToast && (
        <Toast message={message} type={type} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default AuthForm;
