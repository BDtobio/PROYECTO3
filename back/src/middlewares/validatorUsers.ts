import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  console.log("🧪 BODY EN VALIDATE USER:", req.body);
  const { name, email, birthdate, nDni, username, password } = req.body;

  // Validar campos vacíos
  if (!name || !email || !birthdate || !username || !password) {
    res.status(400).json({ message: "Todos los campos son obligatorios." });
    return;
  }

  // Validar nombre
  if (typeof name !== "string") {
    res.status(400).json({ message: "El campo 'name' debe ser un string." });
    return;
  }

  // Validar email
  if (typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    res.status(400).json({ message: "El campo 'email' debe ser un email válido." });
    return;
  }

  // Validar fecha
  const date = new Date(birthdate);
  if (isNaN(date.getTime())) {
    res.status(400).json({ message: "El campo 'birthdate' debe ser una fecha válida (YYYY-MM-DD)." });
    return;
  }

  // VALIDAR DNI CORRECTAMENTE
  const dniNumber = Number(nDni);
  if (!dniNumber || isNaN(dniNumber) || dniNumber < 1000000) {
    res.status(400).json({ message: "El DNI debe ser un número válido." });
    return;
  }

  // Validar username
  if (typeof username !== "string") {
    res.status(400).json({ message: "El campo 'username' debe ser un string." });
    return;
  }

  // Validar password
  if (typeof password !== "string" || password.length < 4) {
    res.status(400).json({ message: "La contraseña debe tener al menos 4 caracteres." });
    return;
  }

  next();
};
