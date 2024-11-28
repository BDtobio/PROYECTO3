
import { useContext, useEffect, useState } from 'react';
import styles from './Reservacion.module.css';
import { useNavigate } from 'react-router-dom'; 
import { UsersContext } from '../../context/UserContext';


const Reservaciones = () => {
  const {user,createAppointment}=useContext(UsersContext)

  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    setFormData((prevForm) => ({
      ...prevForm,
      userId: user, 
    }));
}, [user]);

  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
console.log(formData);

    // setLoading(true); // Indicamos que se está procesando la petición
    try {
      
      await createAppointment(formData)
      alert("se creo el turno")
      navigate("/mis-turnos")
      
    }catch (error) {
      if (error.response) {
        const { message, data } = error.response.data;
        alert('error', message, data);
      } else {
        console.error("Error desconocido:", error);
        alert('error', 'Error desconocido', 'Ocurrió un error inesperado al realizar la reserva.');
      }
    }

   
    }
  return (
    <div className={styles.container}>
      <h2>Haz tu Reservación</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
      
        <button type="submit" className={styles.button}>Reservar</button>
      </form>
      {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
    </div>
  );
};

export default Reservaciones;
