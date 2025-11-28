import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import styles from './NavBar.module.css';
import logo from '../../images/logo.png';
import { UsersContext } from '../../context/UserContext';

const NavBar = () => {
  const { role, logout } = useContext(UsersContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
        <h1>ITALY TASTY</h1>
      </div>

      {/* Botón hamburguesa */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <div className={`${styles.links} ${menuOpen ? styles.active : ''}`}>
        <Link to="/" className={styles.link}>Home</Link>
         <Link to="/acerca-de" className={styles.link}>Nosotros</Link>
            <Link to="/reservaciones" className={styles.link}>Reservaciones</Link>
            <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link>
          

       

        {/* Zona Admin */}
        {role === "admin" && (
          <Link to="/admin" className={styles.link}>
            Panel Admin
          </Link>
        )}

        {/* Botones Login/Register */}
        {!role ? (
          <>
            <Link to="/register" className={`${styles.link} ${styles.registerLoginButton}`}>Register</Link>
            <Link to="/login" className={`${styles.link} ${styles.registerLoginButton}`}>Login</Link>
          </>
        ) : (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
