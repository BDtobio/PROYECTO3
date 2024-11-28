



// import { useUserContext } from '../../context/UserContext';
// import { useAppContext } from '../../context/AppointmentContext';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import NavBar from '../../components/navbar/NavBar';
// import Appointment from '../../components/appointment/Appointment';
// import styles from './MisTurnos.module.css';

// const MisTurnos = () => {
//   const { user } = useUserContext();
//   const { userAppointments, setUserAppointments } = useAppContext();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       window.location.href = '/';
//       return;
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/appointments?userId=${user.id}`);
//         setUserAppointments(response.data.appointments); 
//       } catch (err) {
//         console.error("Error al obtener los turnos:", err);
//         setError("No se pudieron cargar los turnos. Inténtalo nuevamente.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [user, setUserAppointments]);

//   return (
//     <div>
//       <NavBar />
//       <h1>Mis Turnos</h1>
//       {loading ? (
//         <p>Cargando turnos...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : userAppointments.length === 0 ? (
//         <p>No tienes turnos agendados.</p>
//       ) : (
//         <div className={styles.turnosContainer}>
//           {userAppointments.map((appointment) => (
//             <Appointment
//               key={appointment.id}
//               id={appointment.id}
//               date={appointment.date}
//               time={appointment.time}
//               status={appointment.status}
              
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MisTurnos;


// andaaa
// import { useUserContext } from '../../context/UserContext';
// import { useAppContext } from '../../context/AppointmentContext';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import NavBar from '../../components/navbar/NavBar';
// import Appointment from '../../components/appointment/Appointment';
// import styles from './MisTurnos.module.css';

// // Generar un id único para cada appointment
// const generateAppointmentId = (userId, date, time) => {
//   return `${userId}-${date}-${time}`; // Combina los valores para generar un id único
// };

// const MisTurnos = () => {
//   const { user } = useUserContext();
//   const { userAppointments, setUserAppointments, cancelAppointment } = useAppContext();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       window.location.href = '/';
//       return;
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/appointments?userId=${user.id}`);
//         setUserAppointments(response.data.appointments); // Guardamos en el contexto
//       } catch (err) {
//         console.error("Error al obtener los turnos:", err);
//         setError("No se pudieron cargar los turnos. Inténtalo nuevamente.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [user, setUserAppointments]);

//   return (
//     <div>
//       <NavBar />
//       <h1>Mis Turnos</h1>
//       {loading ? (
//         <p>Cargando turnos...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : userAppointments.length === 0 ? (
//         <p>No tienes turnos agendados.</p>
//       ) : (
//         <div className={styles.turnosContainer}>
//           {userAppointments.map((appointment) => {
//             const appointmentId = generateAppointmentId(appointment.userId, appointment.date, appointment.time);

//             return (
//               <Appointment
//                 key={appointmentId}  // Usamos el id único generado como key
//                 appointmentId={appointmentId} // Pasamos el id único al componente Appointment
//                 userId={appointment.userId}
//                 date={appointment.date}
//                 time={appointment.time}
//                 status={appointment.status}
//                 cancelAppointment={cancelAppointment} // Pasamos la función de cancelación
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MisTurnos;
// import { useUserContext } from '../../context/UserContext';
// import { useAppContext } from '../../context/AppointmentContext';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import NavBar from '../../components/navbar/NavBar';
// import Appointment from '../../components/appointment/Appointment';
// import styles from './MisTurnos.module.css';

// // Generar un id único para cada appointment
// const generateAppointmentId = (userId, date, time) => {
//   return `${userId}-${date}-${time}`; // Combina los valores para generar un id único
// };

// const MisTurnos = () => {
//   const { user } = useUserContext();  // Obtenemos los datos del usuario desde el contexto
//   const { userAppointments, setUserAppointments, cancelAppointment } = useAppContext();  // Obtenemos los turnos y la función de cancelación
//   const [loading, setLoading] = useState(true);  // Estado para manejar la carga de turnos
//   const [error, setError] = useState(null);  // Estado para manejar errores

//   useEffect(() => {
//     // Si no hay usuario, redirigimos al home
//     if (!user) {
//       window.location.href = '/';
//       return;
//     }

//     // Función para obtener los turnos del usuario desde el backend
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/appointments?userId=${user.id}`);
//         setUserAppointments(response.data.appointments); // Guardamos los turnos en el contexto
//       } catch (err) {
//         console.error("Error al obtener los turnos:", err);
//         setError("No se pudieron cargar los turnos. Inténtalo nuevamente.");
//       } finally {
//         setLoading(false);  // Terminamos el estado de carga
//       }
//     };

//     fetchAppointments();  // Llamamos a la función para obtener los turnos
//   }, [user, setUserAppointments]);  // Dependemos del usuario y la función de setUserAppointments

//   return (
//     <div>
//       <NavBar />
//       <h1>Mis Turnos</h1>
//       {loading ? (
//         <p>Cargando turnos...</p>  // Muestra mensaje mientras se cargan los turnos
//       ) : error ? (
//         <p className={styles.error}>{error}</p>  // Muestra error si no se pudieron cargar los turnos
//       ) : userAppointments.length === 0 ? (
//         <p>No tienes turnos agendados.</p>  // Muestra mensaje si no hay turnos
//       ) : (
//         <div className={styles.turnosContainer}>
//           {userAppointments.map((appointment) => {
//             const appointmentId = generateAppointmentId(appointment.userId, appointment.date, appointment.time);

//             return (
//               <Appointment
//                 key={appointmentId}  
//                 userId={appointment.userId}
//                 date={appointment.date}
//                 time={appointment.time}
//                 status={appointment.status}
//                 cancelAppointment={cancelAppointment}  
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MisTurnos;



// ULTIMO FUCNIONAL

import { useState,useEffect, useContext} from "react";

import styles from "./MisTurnos.module.css"
import Appointment from "../../components/Appointment/Appointment";
import NavBar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";
// import axios from "axios";
const MisTurnos = () => {
  // const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { user, userAppointments, renderAppointments } = useContext(UsersContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      await renderAppointments(user);
      setLoading(false);
    };

    loadAppointments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   if (!loading && userAppointments.length === 0) {
  //     alert('warning', 'No se encontraron reservas', 'No hay reservas para mostrar, has sido redirigido a la página para agendar una nueva reserva.');
  //     navigate("/agendar");
  //   }
  // }, [loading, userAppointments, navigate]);
  // useEffect(() => {
  //   axios.get("http://localhost:3000/appointments")
  //     .then((res) => {

  //       if (Array.isArray(res.data.appointments)) {
  //         setAppointments(res.data.appointments);
  //       } else {
  //         console.error("La propiedad 'appointments' no es un array:", res.data.appointments);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Hubo un error al obtener los turnos:", error);
  //     });
  // }, []);

  return (
    <div>
      
      <h1>Mis Turnos</h1>
      <div className={styles.turnosContainer}>
        {userAppointments.map((appointment,index) => (
          <Appointment 
            key={appointment.id}
            id={appointment.id}
            date={appointment.date}
            time={appointment.time}
            status={appointment.status}
            index={index+1}
          />
        ))}
      </div>
    </div>
  );
};

export default MisTurnos;



// TOMAS


// import { useEffect, useState, useContext } from "react";
// import Appointment from "../../components/Appointment/Appointment";
// import { UsersContext } from "../../context/UsersContext";
// import NewAppointment from "../../components/NewAppointment/NewAppointment";
// import { useAuth } from "../../context/AuthContext";
// import styles from "./MisTurnos.module.css"
// const MisTurnos= () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { appointments, fetchAppointments, addAppointment } = useContext(UsersContext);
//   const { user } = useAuth();
//   const toggleModal = () => setIsModalOpen(!isModalOpen);


//   useEffect(() => {
//     if (user?.id) {
//       fetchAppointments(user.id);
//     }
//   }, [user?.id]);

//   return (
//     <div className={styles.container}>
//       <h1>Reservas</h1>
//       <div>
//         {appointments.map((appointment) => (
//           <Appointment
//             key={appointment.id}
//             id={appointment.id}
//             date={appointment.date}
//             time={appointment.time}
//             status={appointment.status}
//           />
//         ))}
//       </div>
//       <button onClick={toggleModal} className={styles.button}>
//         Nueva Reserva
//       </button>
//       <NewAppointment isOpen={isModalOpen} 
//       onClose={toggleModal}
//       fetchAppointments={fetchAppointments} 
//       addAppointment={addAppointment}
//       />
//     </div>
//   );
// };

// export default MisTurnos;


