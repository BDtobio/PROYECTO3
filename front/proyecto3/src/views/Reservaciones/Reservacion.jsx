// Reservations.jsx
import { useState } from 'react';

import NavBar from '../../components/navbar/NavBar';
import styles from './Reservacion.module.css'; // Asegúrate de la ruta correcta



const Reservations = () => {
  const [formData, setFormData] = useState({ date: '', time: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation Data:', formData);
    alert('¡Reserva realizada con éxito!');
  };

  return (
    <div>
    <div>
      <NavBar/>
        </div>
    <section className={styles.reservations}>
      
      <div className={styles.overlay}>
        <h2 className={styles.title}>Haz Tu Reservación</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="time">Hora:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Reservar
          </button>
        </form>
      </div>
    </section>
    </div>
  );
};

export default Reservations;