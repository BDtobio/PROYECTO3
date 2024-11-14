import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../services/usersServices";

export const registerUserController = (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, username, password } = req.body;

  try {
    const newUser = createUser(
      name,
      email,
      birthdate,
      nDni,
      username,
      password
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const getAllUsersController = (req: Request, res: Response) => {
  try {
    const users = getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserByIdController = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = getUserById(parseInt(id));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};
