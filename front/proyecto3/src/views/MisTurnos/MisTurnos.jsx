/* eslint-disable no-unused-vars */
import { useState } from "react";
import myAppointments from "../../helpers/myAppointments";
import styles from "./MisTurnos.module.css"
import Appointment from "../../components/Appontment/Appointment";
import appointment from "../../components/Appontment/Appointment";
import NavBar from "../../components/navbar/NavBar";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState(myAppointments);

  return (
    <>
      
      <div >
     
      <NavBar />
      <h1>Mis Turnos</h1>
      <p>Contenido relacionado con los turnos.</p>
    </div>
        <div className={styles.turnosContainer}>
          {appointments.map(({time,date,status,id}) => {
            return(
            <Appointment
              key={id}
              date={appointment.date}
              time={appointment.time}
              setAppointments={setAppointments}
              userid={appointment.id}
            />
          );
          })}
            </div>
            </>
  );
};          

      

    


export default MisTurnos;
