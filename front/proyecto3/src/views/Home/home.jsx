

import NavBar from "../../components/navbar/NavBar";


const Home= () =>{
    return (      
        <div>
        {/* La Navbar solo se renderiza aquí en Home */}
        <NavBar />
        <h1>Bienvenido a la Página Principal</h1>
        <p>Desde aquí puedes navegar a otras secciones como Mis Turnos o Acerca de.</p>
      </div>
  
    );
};
export default Home