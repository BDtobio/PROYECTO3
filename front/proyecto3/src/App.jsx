
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
import Home from "./views/Home/Home";
import AdminPanel from "./views/Admin/AdminPanel";



function App() {


  const location = useLocation();
  const navigate = useNavigate();
useEffect(() => {
  const role = localStorage.getItem("role");
  const isLogged = !!role;

  // SI NO ESTÁ LOGUEADO → al login
  if (!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
    navigate("/login");
    return;
  }

  // SI ES ADMIN Y entra a /admin → OK
  if (role === "admin" && location.pathname.startsWith("/admin")) {
    return;
  }

  // SI ES ADMIN y entra a otras rutas → mandarlo al panel admin
  if (role === "admin" && !location.pathname.startsWith("/admin")) {
    navigate("/admin");
    return;
  }

  // SI ES USER e intenta entrar a /admin → sacarlo
  if (role === "user" && location.pathname.startsWith("/admin")) {
    navigate("/");
  }

}, [location.pathname, navigate]);

  return (
    <>
    <NavBar/>
    
    <Routes>
    <Route path="/notfound" element={<NotFound />} />  
      <Route path="/" element={<Home />} />  
      <Route path="/mis-turnos" element={<MisTurnos />} /> 
      <Route path="/acerca-de" element={<AcercaDe />} /> 
      <Route path="/reservaciones" element={<Reservaciones/>} />  
       <Route path="/register" element={<Register/>}/>
       
      <Route path="/login" element ={<LoginUserForm/>}/>
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<AdminPanel />} />

    </Routes>
    </>
  );
}

export default App;
