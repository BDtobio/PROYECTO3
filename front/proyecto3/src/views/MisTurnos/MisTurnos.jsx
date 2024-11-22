

import { useState,useEffect} from "react";

import styles from "./MisTurnos.module.css"
import Appointment from "../../components/Appointment/Appointment";
import NavBar from "../../components/navbar/NavBar";
// import myAppointments from "../../helpers/myAppointments";
import axios from "axios"


const MisTurnos = () => {
  const [appointments, setAppointments] = useState([]);
  
  // useEffect(()=>{
  //   axios.get("http://localhost:3000/appointments").then((res) => setAppointments(res.data));
  // },[]);
  useEffect(() => {
    axios.get("http://localhost:3000/appointments")
      .then((res) => {
       
        if (Array.isArray(res.data.appointments)) {
          setAppointments(res.data.appointments);
        } else {
          console.error("La propiedad 'appointments' no es un array:", res.data.appointments);
        }
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los turnos:", error);
      });
  }, []);

  return (
    <>
      
      <div >
     
      <NavBar />
      <h1>Mis Turnos</h1>
      <p>Contenido relacionado con los turnos.</p>
    </div>
        <div className={styles.turnosContainer}>
          {appointments.map(({userId,date,time,status}) => {
            return(
            <Appointment
              key={userId}
              date={date}
              time={time}
              status={status}
              setAppointments={setAppointments}
            />
          );
          })}
            </div>
            </>
            
  );
  
};          

      

    


export default MisTurnos;
