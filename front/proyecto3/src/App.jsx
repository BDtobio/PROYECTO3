import Home from "./views/home/home";
import MisTurnos from "./views/MisTurnos/MisTurnos"

// import NavBar from "./components/navbar/NavBar"
import AcercaDe from './views/AcercaDe/AcercaDe';
import Reservations from "./views/Reservaciones/Reservacion";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
  
    <Routes>
      
      <Route path="/" element={<Home />} />  
      <Route path="/mis-turnos" element={<MisTurnos />} /> 
      <Route path="/acerca-de" element={<AcercaDe />} /> 
      <Route path="/reservaciones" element={<Reservations/>} />  
    </Routes>
  </Router>
 
  );
}

export default App;
