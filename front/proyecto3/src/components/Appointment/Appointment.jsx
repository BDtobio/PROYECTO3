/* eslint-disable react/prop-types */




// // ultimoooooooooooo
// import axios from 'axios';
// import styles from './Appointment.module.css';
// import { useAppContext } from '../../context/AppContext';
// import PropTypes from 'prop-types';

// const Appointment = ({ Id, date, time, status }) => {
//   const { setUserAppointments } = useAppContext();


  


//   const handleCancel = async () => {
//     try {
//       await axios.put(`http://localhost:3000/appointments/cancel/${Id}`);
//       setUserAppointments((prevAppointments) =>
//         prevAppointments.filter((appointment) => appointment.Id !== Id)
//       );
//     } catch (error) {
//       console.error('Error al cancelar el turno:', error);
//     }
//   };

//   return (
//     <div className={styles.appointment}>
     
//       <p className={styles.date}><strong>Fecha:</strong> {date}</p>
//       <p className={styles.time}><strong>Hora:</strong> {time}</p>
//       <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
//         {status === 'active' ? 'Activo' : 'Cancelado'}
//       </div>
//       <button onClick={handleCancel}>Cancelar Turno</button>
//     </div>
//   );
// };
// Appointment.propTypes = {
//     Id: PropTypes.number.isRequired, 
//     date: PropTypes.string.isRequired,    
//     time: PropTypes.string.isRequired,    
//     status: PropTypes.string.isRequired   
//   };

// export default Appointment;


// import styles from './Appointment.module.css';
// import { useAppContext } from '../../context/AppointmentContext';
// import PropTypes from 'prop-types';

// const Appointment = ({ Id, date, time, status }) => {
//   const { cancelAppointment } = useAppContext();

//   const handleCancel = async () => {
//     if (status === 'cancelled') return; // Evitar cancelar si ya está cancelado

//     try {
//       await cancelAppointment(Id); // Actualizar el estado en el contexto
//     } catch (error) {
//       console.error('Error al cancelar el turno:', error);
//     }
//   };

//   return (
//     <div className={styles.appointment}>
//       <p className={styles.date}><strong>Fecha:</strong> {date}</p>
//       <p className={styles.time}><strong>Hora:</strong> {time}</p>
//       <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
//         {status === 'active' ? 'Activo' : 'Cancelado'}
//       </div>
//       <button onClick={handleCancel} disabled={status === 'cancelled'}>
//         {status === 'active' ? 'Cancelar Turno' : 'Turno Cancelado'}
//       </button>
//     </div>
//   );
// };

// Appointment.propTypes = {
//   Id: PropTypes.number.isRequired,
//   date: PropTypes.string.isRequired,
//   time: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
// };

// export default Appointment;

// EL QUE ANDA
// import styles from './Appointment.module.css';
// import { useAppContext } from '../../context/AppointmentContext';
// import PropTypes from 'prop-types';

// const Appointment = ({ id, date, time, status }) => {
//   const { cancelAppointment } = useAppContext();
//   const handleCancel = async () => {
//     console.log('id recibido:', id);  // Verifica que el id no sea undefined
//     try {
//       await cancelAppointment(id); // Solo cancelar el turno específico
//     } catch (error) {
//       console.error('Error al cancelar el turno:', error);
//     }
//   };
// //   const handleCancel = async () => {
// //     try {
// //       await cancelAppointment(id); // Solo cancelar el turno específico
// //     } catch (error) {
// //       console.error('Error al cancelar el turno:', error);
// //     }
// //   };

//   return (
//     <div className={styles.appointment}>
//       <p className={styles.date}><strong>Fecha:</strong> {date}</p>
//       <p className={styles.time}><strong>Hora:</strong> {time}</p>
//       <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
//         {status === 'active' ? 'Activo' : 'Cancelado'}
//       </div>
//       {status === 'active' && (
//         <button onClick={handleCancel}>Cancelar Turno</button>
//       )}
//     </div>
//   );
// };

// Appointment.propTypes = {
//   id: PropTypes.number.isRequired,
//   date: PropTypes.string.isRequired,
//   time: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
// };

// export default Appointment;

// andaaaaaaaaaaaW
// import { useAppContext } from '../../context/AppointmentContext';
// import PropTypes from 'prop-types';

// const Appointment = ({ userId, date, time, status }) => {
//   const { cancelAppointment } = useAppContext();

//   const handleCancel = () => {
//     cancelAppointment(userId, date, time); // Pasa el userId, date y time para cancelar el turno
//   };

//   return (
//     <div className="appointment">
//       <p><strong>Fecha:</strong> {date}</p>
//       <p><strong>Hora:</strong> {time}</p>
//       <div className={`status ${status === 'active' ? 'active' : 'cancelled'}`}>
//         {status === 'active' ? 'Activo' : 'Cancelado'}
//       </div>
//       {status === 'active' && (
//         <button onClick={handleCancel}>Cancelar Turno</button>
//       )}
//     </div>
//   );
// };

// Appointment.propTypes = {
//   userId: PropTypes.number.isRequired, // userId único para cada usuario
//   date: PropTypes.string.isRequired,    // Fecha del turno
//   time: PropTypes.string.isRequired,    // Hora del turno
//   status: PropTypes.string.isRequired,  // Estado del turno
// };

// export default Appointment;
// ultimo
// import { useAppContext } from '../../context/AppointmentContext';
// import PropTypes from 'prop-types';
// import styles from './Appointment.module.css';  // Asegúrate de que el archivo de estilos esté bien vinculado

// const Appointment = ({ userId, date, time, status }) => {
//   const { cancelAppointment } = useAppContext();

//   // Función para manejar la cancelación del turno
// //   const handleCancel = () => {
// //     cancelAppointment(userId, date, time); // Pasa userId, date y time para cancelar el turno
// //   };
// const handleCancel = async () => {
//     try {
//       await cancelAppointment(userId, date, time);  // Pasa los datos del turno
//       alert('Turno cancelado exitosamente');
//     } catch (error) {
//       alert(error.message);  // Mostrar el error de cancelación (si el turno ya estaba cancelado)
//     }
//   };
  

//   // Formatear la fecha para mostrarla de manera más legible
//   const formattedDate = new Date(date).toLocaleDateString();
  
//   return (
//     <div className={styles.appointment}>
//       <p><strong>Fecha:</strong> {formattedDate}</p>
//       <p><strong>Hora:</strong> {time}</p>
      
//       <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
//         {status === 'active' ? 'Activo' : 'Cancelado'}
//       </div>

//       {status === 'active' && (
//         <button onClick={handleCancel} className={styles.cancelButton}>
//           Cancelar Turno
//         </button>
//       )}
//     </div>
//   );
// };

// Appointment.propTypes = {
//   userId: PropTypes.number.isRequired,    // userId único para cada usuario
//   date: PropTypes.string.isRequired,      // Fecha del turno
//   time: PropTypes.string.isRequired,      // Hora del turno
//   status: PropTypes.string.isRequired,    // Estado del turno (activo o cancelado)
// };

// export default Appointment;



 

// import styles from "./Appointment.module.css"


// const appointment= ({ date, time,userId,status }) => {
//     return (
//         <div className={styles.appointment}>
//             <h3>Turno de {userId}</h3>
//             <p className={styles.date}><strong>Fecha:</strong> {date}</p>
//             <p className={styles.time}><strong>Hora:</strong> {time}</p>
            
           
//             <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
//                 {status === 'active' ? 'active' : 'cancelled'}
//               </div>
//               <button>Ver Detalles</button>
            
//         </div>
//     );
// };


// export default appointment;

// import styles from "./Appointment.module.css";
// import PropTypes from 'prop-types'
// const Appointment = ({ date, time, userId, status, onCancel }) => {
//   return (
//     <div className={styles.appointment}>
//       <h3>Turno de {userId}</h3>
//       <p className={styles.date}>
//         <strong>Fecha:</strong> {date}
//       </p>
//       <p className={styles.time}>
//         <strong>Hora:</strong> {time}
//       </p>

//       <div
//         className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}
//       >
//         {status === 'active' ? 'active' : 'cancelled'}
//       </div>

//       <button onClick={onCancel}>Cancelar Turno</button>
//       <button>Ver Detalles</button>
//     </div>
//   );
// };
// Appointment.propTypes = {
//   date: PropTypes.string.isRequired, // La fecha debe ser una cadena de texto
//   time: PropTypes.string.isRequired, // La hora debe ser una cadena de texto
//   userId: PropTypes.string.isRequired, // El userId debe ser una cadena de texto
//   status: PropTypes.oneOf(['active', 'cancelled']).isRequired, // El estado debe ser 'active' o 'cancelled'
//   onCancel: PropTypes.func.isRequired, // onCancel debe ser una función
// };

// export default Appointment;
import styles from "./Appointment.module.css";
// import PropTypes from "prop-types";
import {UsersContext} from "../../context/UserContext"
import Swal from "sweetalert2"
import { useContext, useState } from "react";
function showAlert(icon, title, text) {
  Swal.fire({
      icon: icon,
      title: title,
      text: text,
      width: '400px',
      color: '##F5F5DC', 
      background: '#F5F5DC', 
      iconColor: '#FF0000', 
      confirmButtonColor: '#FF0000', 
  });
}


// eslint-disable-next-line react/prop-types
const Appointment = ({ id, date, time, status, index}) => {
  const { cancelAppointment } = useContext(UsersContext);
  const [currentStatus, setCurrentStatus] = useState(status);




  const isCancelable = () => {

  const [year, month, dayHour] = date.split("-");
  const day = dayHour.split("T")[0].split("-")[0];

  const [appHour, appMinute] = time.split(":");

  const appointmentDate = new Date(
      parseInt(year),
      parseInt(month) - 1, 
      parseInt(day),
      parseInt(appHour),
      parseInt(appMinute)
  );


  const nowLocal = new Date();
  const diffMinutes = Math.abs((appointmentDate - nowLocal) / (1000 * 60));

  if (diffMinutes <= 1440) {
      return false;
  } else {
      return true
  } 
}

  const handleOnClick = async () => {
console.log(id)
      if (!isCancelable()) {
          showAlert('warning', 'No se puede cancelar', 'No se puede cancelar la reserva dentro de las 24 horas anteriores al turno.');
          return; 
      }
      try {
          await cancelAppointment(id);
          showAlert('success', 'Reserva cancelada', 'Tu reserva se canceló con éxito');
          setCurrentStatus("cancelled");
      } catch (error) {
          console.error("Error al cancelar la cita:", error);
      }
  };

  const [dateSplit, timeFormat] = date.split("T");
  const dateFormat = dateSplit.split("-").reverse().join("/");
  

  return (
    <div className={styles.appointment}>
      <p className={styles.date}>
        <strong>Fecha:</strong> {dateFormat}
      </p>
      <p className={styles.time}>
        <strong>Hora:</strong> {time}
      </p>

      <div
        className={`${styles.status} ${status === "active" ? styles.active : styles.cancelled}`}
      >
        {status === "active" ? "Activo" : "Cancelado"}
      </div>

      <button onClick={handleOnClick}>Cancelar Turno</button>
      <button>Ver Detalles</button>
    </div>
  );
};

// Appointment.propTypes = {
//   date: PropTypes.string.isRequired, // La fecha debe ser una cadena de texto
//   time: PropTypes.string.isRequired, // La hora debe ser una cadena de texto
//   status: PropTypes.oneOf(["active", "cancelled"]).isRequired, // El estado debe ser 'active' o 'cancelled'
//   onCancel: PropTypes.func.isRequired, // onCancel debe ser una función
// };

export default Appointment;
