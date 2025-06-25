/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


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



const Appointment = ({ id, date, time, status}) => {
  const { cancelAppointment } = useContext(UsersContext);
  const [currentStatus, setCurrentStatus] = useState(status)




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


export default Appointment;
