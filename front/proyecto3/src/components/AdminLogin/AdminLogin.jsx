import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        "/users/admin/login",
        form
      );

      if (data.ok) {
        navigate("/admin/panel");  // <<< DIRECTO AL PANEL ADMIN
      } else {
        setError("Credenciales incorrectas");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Panel administrador</h2>


        <label className={styles.label}>
          Usuario
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Usuario"
          />
        </label>

        <label className={styles.label}>
          Contraseña
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Contraseña"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

AdminLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
