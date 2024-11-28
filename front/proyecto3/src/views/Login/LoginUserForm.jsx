/* eslint-disable no-unused-vars */




import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./LoginUserForm.module.css";
import { UsersContext } from "../../context/UserContext";

const Login = () => {
  const { loginUser } = useContext(UsersContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username.trim() === '' || formData.password.trim() === '') {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

   
    setLoading(true);
    try {
      await loginUser(formData); 
      alert('Inicio de sesión exitoso. ¡Bienvenido!');
      navigate('/'); 
    } catch (error) {
      alert('Ocurrió un error al iniciar sesión. Verifica tus datos.');
    } finally {
      setLoading(false);
    }
  };


  return (
   <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default Login;

