
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styles from './RegisterUser.module.css';
import axios from 'axios'
import image3 from '../../images/image3.png';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username:"",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState(null); // Para manejar mensajes del servidor

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Actualiza el formulario
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));

        // Valida el campo
        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validateField = (fieldName, value) => {
        let error = "";

        if (fieldName === "name" && value.trim() === "") {
            error = "El nombre es obligatorio.";
        } else if (fieldName === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "El correo electrónico no es válido.";
        } else if (fieldName === "nDni" && (isNaN(value) || value.length < 7)) {
            error = "El DNI debe tener al menos 7 dígitos.";
        } else if (fieldName === "password" && value.length < 6) {
            error = "La contraseña debe tener al menos 6 caracteres.";
        } else if (fieldName === "username" && value.trim() === "") {
            error = "El nombre de usuario es obligatorio.";
        }

        return error;
    };

    const postFunction = async (event) => {
        event.preventDefault();

        // Validación antes de enviar
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
              "http://localhost:3000/users/register",
              form
            );
            setServerResponse({ success: true, message: "Registro exitoso." });
            navigate("/login");
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || "Hubo un error, por favor intenta nuevamente.";
            setServerResponse({
              success: false,
              message: errorMessage,
            });
          }
        };
    
    return (
        <div>
            <div className={styles.navRegister}>
            <img src={image3} alt="ancla" className={styles.ancla}/>   
                <h1>ITALY TASTY
                    <br />
                    Restaurante
                </h1>
            </div>
            <div className={styles.formContainer}>
            <form onSubmit={postFunction} className={styles.form}>
                <h1>Registrarse</h1>
                <hr />
                <div className={styles.divInput}>
                    <label>Nombre</label>
                    <input
                    className={styles.formInput}
                    type='text'
                    name='name'
                    placeholder='Nombre'
                    onChange={handleInputChange}></input>
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.divInput}>
                    <label>Email</label>
                    <input
                    className={styles.formInput}
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleInputChange}
                    ></input>
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.divInput}>
                    <label>Fecha de Nacimiento</label>
                    <input
                    className={styles.formInput}
                    type='date'
                    name='birthdate'
                    onChange={handleInputChange}></input>
                    {errors.birthdate && <span className={styles.errorText}>{errors.birthdate}</span>}
                </div>

                <div className={styles.divInput}>
                    <label>DNI</label>
                    <input
                    className={styles.formInput}
                    type='number'
                    name='nDni'
                    placeholder='DNI'
                    onChange={handleInputChange}
                    ></input>
                    {errors.nDni && <span className={styles.errorText}>{errors.nDni}</span>}
                </div>    

                <div className={styles.divInput}>
                    <label>Nombre de Usuario</label>
                    <input
                    className={styles.formInput}
                    type='string'
                    name='username'
                    placeholder='Usuario'
                    onChange={handleInputChange}></input>
                    {errors.username && <span className={styles.errorText}>{errors.username}</span>}
                </div>

                <div className={styles.divInput}>    
                    <label>Contraseña</label>
                    <input
                    className={styles.formInput}
                    type='password'
                    name='password'
                    placeholder='*******'
                    onChange={handleInputChange}></input>
                    {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>   
                
                <div className={styles.divInput}>
                    <label>Repetir Contraseña</label>
                    <input
                    className={styles.formInput}
                    type='password'
                    placeholder='*******'
                    onChange={handleInputChange}></input>
                    {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div> 
                <div>
                    <button type='submit' className={styles.buttonRegister}>Registrarse</button>
                </div>

          {serverResponse && (
            <div
              className={
                serverResponse.success
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {serverResponse.message}
            </div>
          )}
            </form>
            </div>
        </div>
    )
}


export default Register;
