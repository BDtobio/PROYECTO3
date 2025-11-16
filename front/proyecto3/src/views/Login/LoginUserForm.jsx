

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginUserForm.module.css";
import { UsersContext } from "../../context/UserContext";

const Login = () => {
  const { loginUser } = useContext(UsersContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await loginUser(formData);  // SOLO UNA VEZ
    console.log("RESPUESTA LOGIN:", res.data);

    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.log("ERROR EN HANDLE SUBMIT:", error);
    setMessage("Error al iniciar sesión. Verifica los datos.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.formcontainer}>
          <h2>Iniciar sesión</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          {message && (
            <p className={message.includes("error") ? styles.error : styles.success}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
