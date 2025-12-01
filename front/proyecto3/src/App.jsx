
import MisTurnos from "./views/MisTurnos/MisTurnos"

import Register from "./views/Register/RegisterUser";
import LoginUserForm from "./views/Login/LoginUserForm"
import AcercaDe from './views/AcercaDe/AcercaDe';
import Reservaciones from "./views/Reservaciones/Reservacion";
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from "./components/navbar/NavBar";
import { useEffect } from "react";
// import { UsersContext } from "./context/UserContext";
import NotFound from "./views/notFound/notFound";

import AdminPanel from "./views/Admin/AdminPanel";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/home";
import Menu from "./views/Menu/Menu";




function App() {


  const location = useLocation();
  const navigate = useNavigate();
useEffect(() => {
  const role = localStorage.getItem("role");
  const isLogged = !!role;

  // Rutas públicas
  const publicRoutes = ["/", "/acerca-de", "/login", "/register"];
  const isPublic = publicRoutes.includes(location.pathname);

  // 👉 Permitir pasar siempre a rutas públicas
  if (isPublic) return;

  // 🔒 /mis-turnos requiere login
  if (location.pathname === "/mis-turnos" && !isLogged) {
    return navigate("/login");
  }

  // 🔒 /reservaciones requiere login
  if (location.pathname === "/reservaciones" && !isLogged) {
    return navigate("/login");
  }

  // 🔒 Rutas privadas del admin
  if (location.pathname.startsWith("/admin")) {
    if (role === "admin") return;
    return navigate("/login");
  }

}, [location.pathname, navigate]);


  return (
    <>
    <NavBar/>
    
    <Routes>
    <Route path="/notfound" element={<NotFound />} />  
      <Route path="/" element={<Home />} /> 
      <Route path="/menu" element={<Menu/>} /> 
      <Route path="/acerca-de" element={<AcercaDe />} />  
      <Route path="/mis-turnos" element={<MisTurnos />} /> 
  
      <Route path="/reservaciones" element={<Reservaciones/>} />  
       <Route path="/register" element={<Register/>}/>
       
      <Route path="/login" element ={<LoginUserForm/>}/>
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<AdminPanel />} />

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
