import Home from "./views/Home/home";
import MisTurnos from "./views/MisTurnos/MisTurnos"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import NavBar from "./components/navbar/NavBar"
import AcercaDe from './views/AcercaDe/AcercaDe';

function App() {
  return (
    
    <Router>
  
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/mis-turnos" element={<MisTurnos />} />  {/* Mis Turnos */}
      <Route path="/acerca-de" element={<AcercaDe />} />  {/* Acerca de */}
    </Routes>
  </Router>
   
  );
}

export default App;
