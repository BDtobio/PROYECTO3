/* eslint-disable no-unused-vars */


// import { useUserContext } from '../../context/UserContext'; // Importar el UserContext
// import { useState } from 'react';
// import axios from 'axios';
// import NavBar from '../../components/navbar/NavBar';
// import styles from './Reservacion.module.css';

// const Reservations = () => {
//   const { user } = useUserContext(); // Obtener el usuario logueado del UserContext
//   const [formData, setFormData] = useState({ date: '', time: '' });
//   const [message, setMessage] = useState('');

//   // Manejar los cambios en los inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Manejar el envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setMessage("Debes iniciar sesión primero para reservar un turno.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/appointments/schedule", {
//         ...formData,
//         userId: user.id, // Asociar el turno al usuario logueado
//       });
//       setMessage('¡Turno reservado con éxito!');
//     } catch (error) {
//       console.error("Error al reservar el turno:", error);
//       setMessage('Ocurrió un error al reservar el turno. Intenta nuevamente.');
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <h1>Reservar Turno</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.inputGroup}>
//           <label htmlFor="date">Fecha</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="time">Hora</label>
//           <input
//             type="time"
//             id="time"
//             name="time"
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Reservar
//         </button>
//       </form>
//       {message && <p className={styles.message}>{message}</p>}
//     </div>
//   );
// };

// export default Reservations;





// ULTIMOMOMOMOMO
// import { useState } from 'react';
// import axios from 'axios';
// import styles from './Reservacion.module.css';

// const Reservaciones = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     time: '',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Maneja los cambios en los inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Verifica que los campos estén completos
//   const isFormValid = () => {
//     return formData.date.trim() !== '' && formData.time.trim() !== '';
//   };

//   // Maneja el envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setMessage('Por favor, completa todos los campos.');
//       return;
//     }

//     setLoading(true); // Indicamos que se está procesando la petición
//     try {
//       const response = await axios.post('http://localhost:3000/appointments/schedule', formData);

//       if (response.status === 201) {
//         setMessage('Reservación realizada con éxito. ¡Gracias!');
//         setFormData({
//           date: '',
//           time: '',
//         });
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setMessage('Ocurrió un error al realizar la reservación. Intenta nuevamente.');
//     } finally {
//       setLoading(false); // Termina la carga de la petición
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Haz tu Reservación</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="date">Fecha:</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="time">Hora:</label>
//           <input
//             type="time"
//             id="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading || !isFormValid()}>
//           {loading ? 'Cargando...' : 'Reservar'}
//         </button>
//       </form>
//       {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
//     </div>
//   );
// };

// export default Reservaciones;





import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Reservacion.module.css';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { UsersContext } from '../../context/UserContext';

const Reservaciones = () => {
  const {user,createAppointment,renderAppointment}=useContext(UsersContext)

  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    setFormData((prevForm) => ({
      ...prevForm,
      userId: user, 
    }));
}, [user]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Instanciamos el hook para redirecciones

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Verifica que los campos estén completos
  const isFormValid = () => {
    return formData.date.trim() !== '' && formData.time.trim() !== '';
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid()) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }
console.log(formData);

    // setLoading(true); // Indicamos que se está procesando la petición
    try {
      
      await createAppointment(formData)
      alert("se creo el turno")
      navigate("/mis-turnos")
      // const user = JSON.parse(localStorage.getItem('user')); // Obtenemos al usuario logueado
      // if (!user) {
      //   setMessage('Debes iniciar sesión para realizar una reservación.');
      //   navigate('/login'); // Redirige al login si no hay usuario autenticado
      //   return;
    }catch (error) {
      if (error.response) {
        const { message, data } = error.response.data;
        alert('error', message, data);
      } else {
        console.error("Error desconocido:", error);
        alert('error', 'Error desconocido', 'Ocurrió un error inesperado al realizar la reserva.');
      }
    }

      // await axios.post('http://localhost:3000/appointments/schedule', {
      //   ...formData,
      //   userId: user.id, // Incluimos el ID del usuario en la petición
      // });

  //     if(response.status === 201) {
  //       setMessage('Reservación realizada con éxito. Redirigiendo a tus turnos...');
  //       setFormData({
  //         date: '',
  //         time: '',
  //       });
  //       setTimeout(() => {
  //         navigate('/mis-turnos'); // Redirigimos a "Mis Turnos"
  //       }, 2000); // Espera 2 segundos antes de redirigir
  //     }
  //   } catch (error) {
  //     setMessage('Ocurrió un error al realizar la reservación. Intenta nuevamente.');
  //   } 
  //   finally {
  //     setLoading(false); // Termina la carga de la petición
  //   }
  // };
    }
  return (
    <div className={styles.container}>
      <h2>Haz tu Reservación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Hora:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        {/* <button type="submit" disabled={loading || !isFormValid()}>
          {loading ? 'Cargando...' : 'Reservar'}
        </button> */}
        <button type="submit" className={styles.button}>Reservar</button>
      </form>
      {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
    </div>
  );
};

export default Reservaciones;
