import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TasksList from "./TasksList";
import { iniciarSesion } from "../services/UserService";
import Toast from "../utils/Toast";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin =  async (credentials) => {
    console.log("Iniciar sesión con:", credentials);
    try {
      const response = await iniciarSesion(credentials.correo, credentials.contrasenia);
      console.log('la respuesta es: ', response.token);
      if(response.token){
        setIsLoggedIn(true);
        console.log(response);
        setMensaje('Inicio de sesión exitoso');
      }else{
        console.log('else');
        setMessage('¡Hubo un error al hacer la solicitud!');
        setType('error');
        setShowToast(true);
      }
      // Aquí podrías redirigir al usuario a otra página, si es necesario
    } catch (error) {
      csetMessage('¡Hubo un error al hacer la solicitud!');
      setType('error');
      setShowToast(true);
      console.log(error)
      //setMensaje('Error al iniciar sesión');
    }
    
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
