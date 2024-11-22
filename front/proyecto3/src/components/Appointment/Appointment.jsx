 

import styles from "./Appointment.module.css"


const appointment= ({ date, time,userId,status }) => {
    return (
        <div className={styles.appointment}>
            <h3>Turno de {userId}</h3>
            <p className={styles.date}><strong>Fecha:</strong> {date}</p>
            <p className={styles.time}><strong>Hora:</strong> {time}</p>
            
           
            <div className={`${styles.status} ${status === 'active' ? styles.active : styles.cancelled}`}>
                {status === 'active' ? 'active' : 'cancelled'}
              </div>
              <button>Ver Detalles</button>
            
        </div>
    );
};


export default appointment;