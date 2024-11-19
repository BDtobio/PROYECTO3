import { useState } from 'react';

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    nDni: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Introduce un correo válido.';
    }
    if (!formData.birthdate) newErrors.birthdate = 'La fecha de nacimiento es requerida.';
    if (!formData.nDni || isNaN(formData.nDni)) newErrors.nDni = 'El DNI debe ser un número.';
    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es requerido.';
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Datos enviados:', formData);
      alert('Usuario registrado con éxito!');
      setFormData({
        name: '',
        email: '',
        birthdate: '',
        nDni: '',
        username: '',
        password: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrar Usuario</h2>

      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="birthdate">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
          required
        />
        {errors.birthdate && <p style={{ color: 'red' }}>{errors.birthdate}</p>}
      </div>

      <div>
        <label htmlFor="nDni">Número de DNI:</label>
        <input
          type="number"
          id="nDni"
          name="nDni"
          value={formData.nDni}
          onChange={handleInputChange}
          required
        />
        {errors.nDni && <p style={{ color: 'red' }}>{errors.nDni}</p>}
      </div>

      <div>
        <label htmlFor="username">Nombre de Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterUserForm
