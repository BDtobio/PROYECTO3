

// ULTIMO FUNCIONAL
// import { Link } from 'react-router-dom';
// import styles from './navbar.module.css';
// import logo from '../../images/logo.png';
// import { useState, useEffect, useContext } from 'react';
// import { UsersContext } from '../../context/UserContext';

// const NavBar = () => {
//   const {user}=useContext(UsersContext);
//   // Verificamos si el usuario está autenticado
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
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
//         {isAuthenticated && (
//           <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
//         )}
//         <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

//         {!isAuthenticated ? (
//           <>
//             <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
//             <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
//           </>
//         ) : (
//           <button
//             className={styles.logoutButton}
//             onClick={() => {
//               localStorage.removeItem('user');
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


import { Link, useNavigate} from 'react-router-dom';
import { useContext} from 'react';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';
import { UsersContext } from '../../context/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UsersContext);
const navigate=useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem('user');
    setUser(0); // Reseteamos el estado global del usuario
    navigate("/login")
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
        <h1>ITALY TASTY</h1>
      </div>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
        {user !== 0 && (
          <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
        )}
        <Link to="/acerca-de" className={styles.link}>Acerca de</Link>

        {user === 0 ? (
          <>
            <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
            <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
          </>
        ) : (
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
