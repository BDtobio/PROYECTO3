
import MisTurnos from "./views/MisTurnos/MisTurnos"

import Register from "./views/Register/RegisterUser";
import LoginUserForm from "./views/Login/LoginUserForm"
import AcercaDe from './views/AcercaDe/AcercaDe';
import Reservaciones from "./views/Reservaciones/Reservacion";
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from "./components/navbar/NavBar";
import { useContext, useEffect } from "react";
import { UsersContext } from "./context/UserContext";
import NotFound from "./views/notFound/notFound";
import Home from "./views/Home/home";



function App() {
  const { user } = useContext(UsersContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const existingPaths = ['/', '/register', '/login', '/acerca-de',"/mis-turnos",'/reservaciones'];
    if (!user && location.pathname !== "/login" && location.pathname !== "/register") {

      navigate("/login");
    } else if (user && location.pathname === "/login") {

      navigate("/");
    } else if (user && (location.pathname === "/register" || location.pathname === "/login")) {

      navigate("/");
    } else if (user && location.pathname) {
      navigate(location.pathname);
    } else if (!existingPaths.includes(location.pathname)) {
      navigate("/notfound"); 
    }
  }, [user, location.pathname, navigate]);
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
    </Routes>
    </>
  );
}

export default App;
