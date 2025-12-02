import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import styles from "./AdminPanel.module.css";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===========================
  // 🔵 TRAER TODOS LOS TURNOS
  // ===========================
  const fetchAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/appointments");
      setAppointments(data.appointments || data);
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

  // ===========================
  // 🟩 CREAR TURNO (ADMIN)
  // ===========================
const handleCreate = async () => {
  const { value: form } = await Swal.fire({
    title: "Crear turno",
    html: `
      <label>Nombre del cliente:</label>
      <input id="swal-client" class="swal2-input" placeholder="Ej: Juan Pérez" />

      <label>Fecha:</label>
      <input id="swal-date" type="date" class="swal2-input" />

      <label>Hora:</label>
      <input id="swal-time" type="time" class="swal2-input" />
    `,
    confirmButtonText: "Crear",
    focusConfirm: false,
    preConfirm: () => {
      const clientName = document.getElementById("swal-client").value;
      const date = document.getElementById("swal-date").value;
      const time = document.getElementById("swal-time").value;

      if (!clientName || !date || !time) {
        Swal.showValidationMessage("Todos los campos son obligatorios");
        return null;
      }

      return { clientName, date, time };
    }
  });

  if (!form) return;

  try {
    await axiosInstance.post("/appointments/admin", form);
    Swal.fire("Turno creado", "El turno fue generado con éxito", "success");
    fetchAppointments();
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.response?.data?.error || "No se pudo crear el turno", "error");
  }
};


  // ===========================
  // 🟨 EDITAR TURNO
  // ===========================
  const handleEdit = async (turno) => {
    const { value: form } = await Swal.fire({
      title: "Editar turno",
      html: `
        <label>Fecha:</label>
        <input id="swal-date" type="date" class="swal2-input" value="${turno.date}" />

        <label>Hora:</label>
        <input id="swal-time" type="time" class="swal2-input" value="${turno.time}" />
      `,
      confirmButtonText: "Actualizar",
      focusConfirm: false,
      preConfirm: () => {
        const date = document.getElementById("swal-date").value;
        const time = document.getElementById("swal-time").value;

        if (!date || !time) {
          Swal.showValidationMessage("Fecha y hora obligatorias");
          return null;
        }

        return { date, time };
      }
    });

    if (!form) return;

    try {
      await axiosInstance.put(`/appointments/admin/${turno.id}`, form);
      Swal.fire("Actualizado", "El turno fue actualizado", "success");
      fetchAppointments();
    } catch (err) {
       console.error(err);
      Swal.fire("Error", "No se pudo actualizar el turno", "error");
    }
  };

  // ===========================
  // 🟥 ELIMINAR TURNO
  // ===========================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/appointments/admin/${id}`);
      Swal.fire("Cancelado", "El turno fue calcelado", "success");
      fetchAppointments();
    } catch (err) {
       console.error(err);
      Swal.fire("Error", "No se pudo eliminar el turno", "error");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel Administrador</h1>

      <button className={styles.btnCreate} onClick={handleCreate}>
        Crear turno
      </button>

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
                <td>{turno.userName}</td>
                <td>{turno.date}</td>
                <td>{turno.time}</td>
                <td>{turno.status}</td>

                <td>
                  <button
                    className={styles.btnEdit}
                    onClick={() => handleEdit(turno)}
                  >
                    Editar
                  </button>

                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDelete(turno.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}
