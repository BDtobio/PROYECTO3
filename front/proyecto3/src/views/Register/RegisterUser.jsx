
import { useState } from "react";

import { useNavigate } from "react-router-dom"; 
import styles from "./RegisterUser.module.css";
import { validateField } from "../../helpers/validateRegister";
import axiosInstance from "../../api/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      const error = validateField(name, value, updatedForm);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      return updatedForm;
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });
    if (!isFormValid()) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    try {
     const response= await axiosInstance.post("/users/register", formData);
      if (response.status === 201) {
        setMessage("Registro exitoso. ¡Bienvenido!");
        setFormData({
          name: "",
          email: "",
          birthdate: "",
          nDni: "",
          username: "",
          password: "",
        });
  
        setTimeout(() => {
          navigate("/login"); 
        }, 1000); 
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage(
        "Ocurrió un error al registrar el usuario. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <div className={styles.container}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && typeof errors.name === "string" && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && typeof errors.email === "string" && (
                    <span className={styles.errorText}>{errors.email}</span>
                    )}
        </div>
        <div className="inputContainer">
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
{errors.birthdate && typeof errors.birthdate === "string" && (
                    <span className={styles.errorText}>{errors.birthdate}</span>
                    )}
        </div>
        <div>
          <label htmlFor="nDni">Número de DNI:</label>
          <input
            type="number"
            id="nDni"
            name="nDni"
            value={formData.nDni}
            onChange={handleChange}
            required
          />
          {errors.nDni && typeof errors.nDni === "string" && (
                    <span className={styles.errorText}>{errors.nDni}</span>
                    )}
        </div>
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
          {errors.username && typeof errors.username === "string" && (
                    <span className={styles.errorText}>{errors.username}</span>
                    )}
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
          {errors.password && typeof errors.password === "string" && (
                    <span className={styles.errorText}>{errors.password}</span>
                    )}
        </div>
        <button type="submit" disabled={loading || !isFormValid()}>
          {loading ? "Cargando..." : "Registrar"}
        </button>
      </form>
      {message && (
        <p
          className={message.includes("error") ? styles.error : styles.success}
        >
          {message}
        </p>
      )}
    </div>
    </>
  );
};

export default Register;
