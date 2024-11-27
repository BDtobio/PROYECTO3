import Home from "./views/home/home";
import MisTurnos from "./views/MisTurnos/MisTurnos"

import Register from "./views/Register/RegisterUser";
import LoginUserForm from "./views/Login/LoginUserForm"
import AcercaDe from './views/AcercaDe/AcercaDe';
import Reservaciones from "./views/Reservaciones/Reservacion";
import {Route, Routes } from 'react-router-dom';
// import { UserProvider } from "./context/UserContext";

function App() {
  return (
  
    <Routes>
      
      <Route path="/" element={<Home />} />  
      <Route path="/mis-turnos" element={<MisTurnos />} /> 
      <Route path="/acerca-de" element={<AcercaDe />} /> 
      <Route path="/reservaciones" element={<Reservaciones/>} />  
       <Route path="/register" element={<Register/>}/>
      <Route path="/login" element ={<LoginUserForm/>}/>
    </Routes>
  
  );
}

export default App;
