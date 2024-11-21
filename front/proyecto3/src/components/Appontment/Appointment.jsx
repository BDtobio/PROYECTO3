 

import styles from "./Appointment.module.css"

const appointment= ({ date, time,id,status }) => {
    return (
        <div className={styles.appointment}>
            <h3>Turno de {id}</h3>
            <p className={styles.date}><strong>Fecha:</strong> {date}</p>
            <p className={styles.time}><strong>Hora:</strong> {time}</p>
            
           
            <div className={`${styles.status} ${status === 'confirmed' ? styles.confirmed : styles.cancelled}`}>
                {status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
              </div>
              <button>Ver Detalles</button>
            
        </div>
    );
};


export default appointment;