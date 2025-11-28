import { Request, Response } from "express";
import { getUserById, getAllUsers, registerUser, loginUser } 
from "../services/userServices";
import { loginUserSucessDto, registerUserDto } from "../dtos/userDto";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: "No se ha podido completar la solicitud", error });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate), // ← OBJETO DATE
        nDni: user.nDni,

        appointments: user.appointments.map(a => ({
          id: a.id,
          date: new Date(a.date), // ← OBJETO DATE
          time: a.time,
          status: a.status,
          userId: user.id,
          userName: user.name
        }))
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, registerUserDto>,
  res: Response
) => {
  try {
    console.log("🔥 BODY RECIBIDO REGISTER:", req.body);

    const newUser = await registerUser(req.body);

    res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: newUser,
    });
  } catch (error) {
    console.error("❌ ERROR EN REGISTER CONTROLLER:", error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Hubo un error en el registro",
    });
  }
};
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;

  // ADMIN LOGIN
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.status(200).json({
      login: true,
      role: "admin",
      user: {
        id: "admin",
        name: "Administrador",
        email: "admin@system.com"
      }
    });
    return; // ← OBLIGATORIO
  }

  // USER LOGIN NORMAL
  try {
    const response: loginUserSucessDto = await loginUser(req.body);

    res.status(200).json({
      ...response,
      role: "user",
    });
    return; // ← OBLIGATORIO
  } catch (error) {

    console.log("💥 ERROR EN LOGIN CONTROLLER:", error);

    res.status(400).json({
      message: "Usuario o contraseña incorrectos",
    });
  }
};
