import { useContext, useEffect, useState } from 'react';
import styles from './Reservacion.module.css';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UserContext';

const Reservaciones = () => {
  const { user, createAppointment } = useContext(UsersContext);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    userId: null
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Cargar datos del usuario automáticamente
  useEffect(() => {
    console.log("🔥 USER EN RESERVACION:", user);
    if (user) {
      setFormData(prev => ({
        ...prev,
        userId: user.id
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return formData.date.trim() !== '' && formData.time.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    console.log("📌 Enviando turno:", formData);

    try {
      await createAppointment(formData);
      alert("Se creó el turno correctamente");
      navigate("/mis-turnos");
    } catch (error) {
      console.error(error);
      alert('Error en el turno, revisa fecha u hora');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2>Haz tu Reservación</h2>

        <form onSubmit={handleSubmit}>
          
          {/* Mostrar nombre automáticamente */}
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={user?.name || ""}
              disabled
            />
          </div>

          <div>
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="time">Hora:</label>
            <input
              type="time"
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

        {message && (
          <p className={message.includes("error") ? styles.error : styles.success}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Reservaciones;
