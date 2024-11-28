export const validateField = (fieldName, value, form = {}) => {
    let error = "";

    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fieldName === "name") {
        if (value.trim() === "") {
            error = "El nombre es obligatorio.";
        } else if (!regexName.test(value)) {
            error = "El nombre solo puede contener letras y espacios.";
        }
    }
    if (fieldName === "email" && !regexMail.test(value)) {
        error = "El correo electrónico no es válido.";
    }
    if (fieldName === "nDni" && (isNaN(value) || value.length < 7 || value.length > 8)) {
        error = "El DNI debe tener al menos 7 dígitos y no más de 8.";
    }

    if (fieldName === "password") {
        if (value.length < 6) {
            error = "La contraseña debe tener al menos 6 caracteres.";
        }
        else if (!/[A-Z]/.test(value)) {
            error = "La contraseña debe contener al menos una letra mayúscula.";
        } else if (!/[0-9]/.test(value)) {
            error = "La contraseña debe contener al menos un número.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            error = "La contraseña debe contener al menos un carácter especial.";
        }
    }

    if (fieldName === "username" && value.trim() === "") {
        error = "El nombre de usuario es obligatorio.";
    }

    if (fieldName === "passwordRepeat" && form.password && value !== form.password) {
        error = "Las contraseñas no coinciden.";
    }
        

    return error;
};
