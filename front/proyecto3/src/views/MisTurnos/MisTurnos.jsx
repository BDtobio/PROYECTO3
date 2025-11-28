/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from "react";
import styles from "./MisTurnos.module.css";
import Appointment from "../../components/Appointment/Appointment";

import { UsersContext } from "../../context/UserContext";

const MisTurnos = () => {

  const { user, userAppointments, renderAppointments, cancelAppointment } = useContext(UsersContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadAppointments = async () => {

    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    await renderAppointments(user.id);
    setLoading(false);
  };

  loadAppointments();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [user]);

  console.log("TURNOS RECIBIDOS:", userAppointments);

  return (
    <div className={styles.pageContainer}>
      <h1>Mis Turnos</h1>

      <div className={styles.turnosContainer}>
        {userAppointments.map((appointment) => (
          <Appointment 
            key={appointment.id}
            id={appointment.id}
            date={appointment.date}
            time={appointment.time}
            status={appointment.status}
            userName={appointment.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default MisTurnos;
