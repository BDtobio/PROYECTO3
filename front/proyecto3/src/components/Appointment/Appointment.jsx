/* eslint-disable react/prop-types */

import styles from "./Appointment.module.css";
import { UsersContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { useContext, useState } from "react";

function showAlert(icon, title, text) {
  Swal.fire({
    icon,
    title,
    text,
    width: "400px",
    color: "#2c2c2c",
    background: "#F5F5DC",
    iconColor: "#a33f10",
    confirmButtonColor: "#a33f10",
  });
}

const Appointment = ({ id, date, time, status, userName }) => {
  const { cancelAppointment } = useContext(UsersContext);
  const [currentStatus, setCurrentStatus] = useState(status);

  // =====================================
  // 🔒 PREVENIR CRASH si date o time están vacíos
  // =====================================
  if (!date || !time) return null;

  // =====================================
  // ⏳ FORMATEO SEGURO DE FECHA
  // =====================================
  let dateFormatted = "Fecha inválida";

  try {
    const fecha = new Date(date);
    const day = fecha.getDate().toString().padStart(2, "0");
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const year = fecha.getFullYear();
    dateFormatted = `${day}/${month}/${year}`;
  } catch (err) {
    console.log("Error al formatear la fecha:", err);
  }

  // =====================================
  // ❌ VALIDAR SI SE PUEDE CANCELAR (24 hrs)
  // =====================================
  const canCancel = () => {
    const appointmentDate = new Date(date);
    const now = new Date();
    const diffMinutes = (appointmentDate - now) / (1000 * 60);
    return diffMinutes > 1440; // Más de 24 horas → cancelable
  };

  // =====================================
  // ❌ CANCELAR TURNO
  // =====================================
  const handleCancel = async () => {
    if (!canCancel()) {
      showAlert(
        "warning",
        "No se puede cancelar",
        "Solo se puede cancelar con más de 24 horas de anticipación."
      );
      return;
    }

    try {
      await cancelAppointment(id);
      setCurrentStatus("cancelled");
      showAlert("success", "Turno cancelado", "Tu turno ha sido cancelado.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.info}>
        
        <p className={styles.userName}>
          <strong>Reservado por:</strong> {userName}
        </p>

        <p className={styles.date}>{dateFormatted}</p>
        <p className={styles.time}>{time}</p>

        <span
          className={`${styles.status} ${
            currentStatus === "active" ? styles.active : styles.cancelled
          }`}
        >
          {currentStatus === "active" ? "Activo" : "Cancelado"}
        </span>
      </div>

      <div className={styles.buttons}>
        <button className={styles.viewBtn}>Ver</button>

        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Appointment;
