import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, birthdate, nDni, username, password } = req.body;

  if (!name || !email || !birthdate || !nDni || !username || !password) {
    res.status(400).json({ message: "Todos los campos son obligatorios." });
    return;
  }

  if (typeof name !== "string") {
    res.status(400).json({ message: "El campo 'name' debe ser un string." });
    return;
  }

  if (typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    res.status(400).json({ message: "El campo 'email' debe ser un email válido." });
    return;
  }

  const date = new Date(birthdate);
  if (isNaN(date.getTime())) {
    res.status(400).json({ message: "El campo 'birthdate' debe ser una fecha válida en formato ISO 8601 (YYYY-MM-DD)." });
    return;
  }
  

  if (typeof username !== "string") {
    res.status(400).json({ message: "El campo 'username' debe ser un string." });
    return;
  }

  if (typeof password !== "string" || password.length < 6) {
    res.status(400).json({ message: "El campo 'password' debe ser un string de al menos 6 caracteres." });
    return;
  }

  
  next();
};
