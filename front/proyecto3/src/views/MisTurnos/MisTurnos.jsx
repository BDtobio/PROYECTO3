/* eslint-disable no-unused-vars */





import { useState,useEffect, useContext} from "react";

import styles from "./MisTurnos.module.css"
import Appointment from "../../components/Appointment/Appointment";

import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";

const MisTurnos = () => {
 
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


