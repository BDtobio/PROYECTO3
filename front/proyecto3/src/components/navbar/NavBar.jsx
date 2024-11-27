

// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css'
// import logo from '../../images/logo.png';
// import Register from '../../views/Register/RegisterUser';
// import LoginUserForm from "../../views/Login/LoginUserForm";
// import { useState } from 'react';
// const NavBar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const openLoginModal = () => setIsLoginModalOpen(true);
//   const closeLoginModal = () => setIsLoginModalOpen(false);

//   return (
//     <nav className={styles.navbar}>
// <div className={styles.logo}>
// <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
  
//   <h1>ITALY TASTY</h1>
//   </div>
//     <div className={styles.links}>
//     <Link to="/" className={styles.link}>Home</Link> 
//     <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
//     <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link> 
//     <Link to="/acerca-de" className={styles.link}>Acerca de</Link> 
//     </div>
//     <button onClick={openLoginModal}>Iniciar Sesión</button>
//     <button onClick={openModal}>Registrate</button>
//     <LoginUserForm isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    

//       {isModalOpen && (
//         <div className={styles.modalBackdrop} onClick={closeModal}>
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()} 
//           >
//             <Register openLoginModal={openLoginModal} onClose={closeModal} />
//             {/* <Register isOpen={isModalOpen} onClose={closeModal} /> */}
//           </div>
//         </div>
//       )}
//   </nav>
//   );
// };

// export default NavBar;

// ultimomomom
// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css';
// import logo from '../../images/logo.png';
// import { useState, useEffect } from 'react';

// const NavBar = () => {
//   // Aquí verificamos si el usuario está autenticado o registrado
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Verifica si el usuario está autenticado
//     const user = localStorage.getItem('user'); // O puedes usar un contexto global
//     if (user) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
//         <h1>ITALY TASTY</h1>
//       </div>

//       <div className={styles.links}>
//         <Link to="/" className={styles.link}>Home</Link>
//         <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
//         <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
//         <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

//         {!isAuthenticated && (
//           <>
//             <Link to="/register" className={styles.link}>Register</Link>
//             <Link to="/login" className={styles.link}>Login</Link>
//           </>
//         )}

//         {isAuthenticated && (
//           <button className={styles.logoutButton} onClick={() => {
//             localStorage.removeItem('user');
//             setIsAuthenticated(false);
//           }}>
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;


// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css';
// import logo from '../../images/logo.png';
// import { useState, useEffect } from 'react';

// const NavBar = () => {
//   // Aquí verificamos si el usuario está autenticado o registrado
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Verifica si el usuario está autenticado
//     const user = localStorage.getItem('user'); // O puedes usar un contexto global
//     if (user) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
//         <h1>ITALY TASTY</h1>
//       </div>

//       <div className={styles.links}>
//         <Link to="/" className={styles.link}>Home</Link>
//         <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
//         <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
//         <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

//         {!isAuthenticated && (
//           <>
//             <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
//             <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
//           </>
//         )}

//         {isAuthenticated && (
//           <button className={styles.logoutButton} onClick={() => {
//             localStorage.removeItem('user');
//             setIsAuthenticated(false);
//           }}>
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;





// ULTIMO FUNCIONAL
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';
import { useState, useEffect } from 'react';

const NavBar = () => {
  // Verificamos si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user'); // O puedes usar un contexto global
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
        <h1>ITALY TASTY</h1>
      </div>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
        {isAuthenticated && (
          <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
        )}
        <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
            <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
          </>
        ) : (
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem('user');
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css';
// import logo from '../../images/logo.png';
// import { useState, useEffect } from 'react';

// const NavBar = () => {
//   // Estado para verificar si el usuario está autenticado
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('user'); // Verificar si hay usuario logueado
//     if (user) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
//         <h1>ITALY TASTY</h1>
//       </div>

//       <div className={styles.links}>
//         <Link to="/" className={styles.link}>Home</Link>
//         <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
        
//         {/* Mostrar "Mis Turnos" solo si el usuario está autenticado */}
//         {isAuthenticated && (
//           <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
//         )}

//         <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

//         {/* Mostrar botones de login y registro si el usuario no está autenticado */}
//         {!isAuthenticated ? (
//           <>
//             <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
//             <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
//           </>
//         ) : (
//           <button
//             className={styles.logoutButton}
//             onClick={() => {
//               localStorage.removeItem('user'); // Eliminar el usuario del localStorage
//               setIsAuthenticated(false);
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
