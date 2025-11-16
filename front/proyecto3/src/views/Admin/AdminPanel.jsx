import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import styles from "./AdminPanel.module.css";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Traer todos los turnos del backend
  const fetchAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/appointments");
      setAppointments(data.appointments || data); 
      // depende de cómo respondas desde el backend
    } catch (err) {
        console.log(err);
      setError("No se pudieron cargar los turnos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel Administrador</h1>

      {loading && <p className={styles.loading}>Cargando turnos...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.id}</td>
                <td>{turno.user?.name || "Sin usuario"}</td>
                <td>{turno.date}</td>
                <td>{turno.time}</td>
                <td>{turno.status}</td>
                <td>
                  <button className={styles.btnEdit}>Editar</button>
                  <button className={styles.btnDelete}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
