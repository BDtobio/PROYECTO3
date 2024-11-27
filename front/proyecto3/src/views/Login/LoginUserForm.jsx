



// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import axios from "axios";
// import styles from "../Login/LoginUserForm.module.css";
// import { useUserContext } from "../../context/UserContext"; // Importa el hook del contexto

// const Login = ({ isOpen, onClose }) => {
//   const { loginUser } = useUserContext(); // Obtén la función para actualizar el usuario
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.password) {
//       setMessage('Por favor, completa todos los campos.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:3000/users/login", formData);
//       loginUser(response.data.user); // Actualiza el estado del usuario en el contexto
//       setMessage("¡Login exitoso! Benvenuto.");
//     } catch (error) {
//       console.error("Error en el login:", error);
//       setMessage("Error. Verifica tus credenciales.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <h2 className={styles.title}>Iniciar Sesión</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.inputGroup}>
//             <label htmlFor="username">Usuario</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Tu usuario"
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <label htmlFor="password">Contraseña</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Tu contraseña"
//               className={styles.input}
//             />
//           </div>
//           <button type="submit" disabled={loading} className={styles.submitButton}>
//             {loading ? "Cargando..." : "Iniciar Sesión"}
//           </button>
//         </form>
//         {message && <p className={styles.message}>{message}</p>}
//         <button onClick={onClose} className={styles.closeButton}>
//           Cerrar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;



// EL ULTIMO QUE FUNCIONA XD



import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import styles from './LoginUserForm.module.css'; // Importar el módulo de CSS
import { UsersContext } from '../../context/UserContext';

const Login = () => {
  const {loginUser}=useContext(UsersContext)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Verifica que los campos estén completos
  const isFormValid = () => {
    return formData.username.trim() !== '' && formData.password.trim() !== '';
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Indicamos que se está procesando la petición
    try {
      loginUser(formData)
      // const response = await axios.post('http://localhost:3000/users/login', formData);
      navigate('/');
      
      if (response.status === 200) {
        setMessage('Inicio de sesión exitoso. ¡Bienvenido!');
        // Almacena el token o usuario si es necesario
        localStorage.setItem('user', JSON.stringify(response.data.user)); // O ajusta esto según la respuesta de tu API
        setFormData({
          username: '',
          password: '',
        });

        // Redirige al usuario a la página principal después de iniciar sesión
        
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Ocurrió un error al iniciar sesión. Verifica tus datos.');
    } finally {
      setLoading(false); // Termina la carga de la petición
    }
  };

  return (
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
          <button type="submit" disabled={loading || !isFormValid()}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
