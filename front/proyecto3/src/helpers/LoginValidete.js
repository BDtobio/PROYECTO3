// helpers/loginValidate.js

export const validateForm = (form) => {
    const errors = {};
    
    if (!form.username) {
      errors.username = "El usuario es obligatorio";
    }
    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    return errors;
  };
  
  export const validateField = (name, value) => {
    let error = "";
    
    if (name === "username" && !value) {
      error = "El usuario es obligatorio";
    }
    
    if (name === "password") {
      if (!value) {
        error = "La contraseña es obligatoria";
      } else if (value.length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres";
      }
    }
    
    return error;
  };
  