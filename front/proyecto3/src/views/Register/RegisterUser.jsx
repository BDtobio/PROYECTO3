



// import { useState } from 'react';
// import styles from './RegisterUser.module.css';
// import axios from 'axios'

// import { useNavigate } from 'react-router-dom';


// const Register = ({ openLoginModal, onClose }) => {
//     const navigate = useNavigate();
   
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         birthdate: "",
//         nDni: "",
//         username:"",
//         password: "",
//         confirmPassword: "",
//     })
//     const [errors, setErrors] = useState({});
//     const [serverResponse, setServerResponse] = useState(null); 

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;

     
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: value,
            
//         }));

       
//         const error = validateField(name, value);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: error,
//         }));
//         if (name === "password" || name === "passwordRepeat") {
//             setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 passwordRepeat:
//                     name === "passwordRepeat" && form.password !== value
//                         ? "Las contraseñas no coinciden."
//                         : "",
//             }));
//         }
//     };

//     const validateField = (fieldName, value) => {
//         let error = "";

//         if (fieldName === "name" && value.trim() === "") {
//             error = "El nombre es obligatorio.";
//         } else if (fieldName === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//             error = "El correo electrónico no es válido.";
//         } else if (fieldName === "nDni" && (isNaN(value) || value.length < 7)) {
//             error = "El DNI debe tener al menos 7 dígitos.";
//         } else if (fieldName === "password" && value.length < 6) {
//             error = "La contraseña debe tener al menos 6 caracteres.";
//         } else if (fieldName === "username" && value.trim() === "") {
//             error = "El nombre de usuario es obligatorio.";
//         }
//         return error;
//     };


//     const postFunction = async (event) => {
//         event.preventDefault();
//         console.log("Formulario enviado:", form);

      
//         const newErrors = {};
//         Object.keys(form).forEach((key) => {
//             const error = validateField(key, form[key]);
//             if (error) newErrors[key] = error;
//         });
//         if (form.password !== form.confirmPassword) {
//             newErrors.confirmPassword = "Las contraseñas no coinciden.";
//         }
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         try {
//             // const payload = {
//             //     name: form.name,
//             //     email: form.email,
//             //     birthdate: form.birthdate.replace(/-/g, "/"), // Convierte a formato YYYY/MM/DD
//             //     nDni: Number(form.nDni), // Asegura que sea un número
//             //     username: form.username,
//             //     password: form.password,
//             // };
           
//             await axios.post(
//               "http://localhost:3000/users/register",
//               form
              
//             );
//             setServerResponse({ success: true, message: "Registro exitoso." });
//             openLoginModal(); // Abre el modal de Login después de un registro exitoso.
//             onClose(); // Cierra el modal de registro.
//             // navigate("/login");
//           } catch (error) {
//             const errorMessage =
//               error.response?.data?.message || "Hubo un error, por favor intenta nuevamente.";
//             setServerResponse({
//               success: false,
//               message: errorMessage,
//             });
//           }
//         };
        
//     return (
//         <div className={styles.RegisterForm}>
//             <div className={styles.navRegister}>
//             {/* <img src={imageform2} alt="imageform" className={styles.ancla}/>    */}
//                 <h1>ITALY TASTY
//                     <br />
                    
//                 </h1>
//             </div>
//             <div className={styles.formContainer}>
//             <form onSubmit={postFunction} className={styles.form}>
//                 <h1>Registrarse</h1>
//                 <hr />
//                 <div className={styles.divInput}>
//                     <label>Nombre</label>
//                     <input
//                     className={styles.formInput}
//                     type='text'
//                     name='name'
//                     placeholder='Nombre'
//                     onChange={handleInputChange}></input>
//                     {errors.name && <span className={styles.errorText}>{errors.name}</span>}
//                 </div>

//                 <div className={styles.divInput}>
//                     <label>Email</label>
//                     <input
//                     className={styles.formInput}
//                     type='email'
//                     name='email'
//                     placeholder='Email'
//                     onChange={handleInputChange}
//                     ></input>
//                     {errors.email && <span className={styles.errorText}>{errors.email}</span>}
//                 </div>

//                 <div className={styles.divInput}>
//                     <label>Fecha de Nacimiento</label>
//                     <input
//                     className={styles.formInput}
//                     type='date'
//                     name='birthdate'
//                     onChange={handleInputChange}></input>
//                     {errors.birthdate && <span className={styles.errorText}>{errors.birthdate}</span>}
//                 </div>

//                 <div className={styles.divInput}>
//                     <label>DNI</label>
//                     <input
//                     className={styles.formInput}
//                     type='number'
//                     name='nDni'
//                     placeholder='DNI'
                    
//                     onChange={handleInputChange}
//                     ></input>
//                     {errors.nDni && <span className={styles.errorText}>{errors.nDni}</span>}
//                 </div>    

//                 <div className={styles.divInput}>
//                     <label>Nombre de Usuario</label>
//                     <input
//                     className={styles.formInput}
//                     type='string'
//                     name='username'
//                     placeholder='Usuario'
//                     onChange={handleInputChange}></input>
//                     {errors.username && <span className={styles.errorText}>{errors.username}</span>}
//                 </div>

//                 <div className={styles.divInput}>    
//                     <label>Contraseña</label>
//                     <input
//                     className={styles.formInput}
//                     type='password'
//                     name='password'
//                     placeholder='*******'
//                     onChange={handleInputChange}></input>
//                     {errors.password && <span className={styles.errorText}>{errors.password}</span>}
//                 </div>   
                
//                 <div className={styles.divInput}>
//                     <label>Repetir Contraseña</label>
//                     <input
//                     className={styles.formInput}
//                     type='password'
//                     name='confirmPassword'
//                     placeholder='*******'
//                     onChange={handleInputChange}></input>
//                     {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
//                 </div> 
//                 <div>
//                     <button type='submit' className={styles.buttonRegister}>Registrarse</button>
//                 </div>

//           {serverResponse && (
//             <div
//               className={
//                 serverResponse.success
//                   ? styles.successMessage
//                   : styles.errorMessage
//               }
//             >
//               {serverResponse.message}
//             </div>
//           )}
//             </form>
//             </div>
//         </div>
        
//     )

// }


// export default Register;



// ultimoooooooooooooooooooooo
// import { useState } from 'react';
// import axios from 'axios';
// import styles from './RegisterUser.module.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     birthdate: '',
//     nDni: '',
//     username: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const isFormValid = () => {
//     return Object.values(formData).every((value) => value.trim() !== '');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setMessage('Por favor, completa todos los campos.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/users/register', formData);
//       if (response.status === 201) {
//         setMessage('Registro exitoso. ¡Bienvenido!');
//         setFormData({
//           name: '',
//           email: '',
//           birthdate: '',
//           nDni: '',
//           username: '',
//           password: '',
//         });
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setMessage('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Registro</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Nombre:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="birthdate">Fecha de Nacimiento:</label>
//           <input
//             type="date"
//             id="birthdate"
//             name="birthdate"
//             value={formData.birthdate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="nDni">Número de DNI:</label>
//           <input
//             type="number"
//             id="nDni"
//             name="nDni"
//             value={formData.nDni}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="username">Nombre de Usuario:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading || !isFormValid()}>
//           {loading ? 'Cargando...' : 'Registrar'}
//         </button>
//       </form>
//       {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
//     </div>
//   );
// };

// export default Register;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import styles from './RegisterUser.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    nDni: '',
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Declaramos el hook de navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users/register', formData);
      if (response.status === 201) {
        setMessage('Registro exitoso. ¡Bienvenido!');
        setFormData({
          name: '',
          email: '',
          birthdate: '',
          nDni: '',
          username: '',
          password: '',
        });
        // Redirigir al usuario a la página de Login después de un registro exitoso
        setTimeout(() => {
          navigate('/login'); // Redirigimos a Login
        }, 1000); // Esperamos 1 segundo antes de redirigir
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
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
        <button type="submit" disabled={loading || !isFormValid()}>
          {loading ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
      {message && <p className={message.includes('error') ? styles.error : styles.success}>{message}</p>}
    </div>
  );
};

export default Register;
