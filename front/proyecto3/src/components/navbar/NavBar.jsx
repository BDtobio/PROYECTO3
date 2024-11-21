

import { Link } from 'react-router-dom';
import styles from './navbar.module.css'
import logo from '../../images/logo.png';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
<div className={styles.logo}>
<img src={logo} alt="Logo Restaurante" className={styles.logoImage} />
  {/* <div> */}
  <h1>Restaurante Italiano</h1>
  </div>

      {/* </div> */}
     
    <div className={styles.links}>
    <Link to="/" className={styles.link}>Home</Link> 
    <Link to="/mis-turnos" className={styles.link}>Mis Turnos</Link> 
    <Link to="/acerca-de" className={styles.link}>Acerca de</Link> 
    </div>
  </nav>
  );
};

export default NavBar;


