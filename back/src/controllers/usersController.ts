import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../services/usersServices";

import { loginUserDto } from "../dtos/userDto";

export const registerUserController =async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({message: "Usuario registrado correctamente.",
        user: newUser.name
    })
} catch {
    res.status(400).json({message: "Hubo un error en el registro"})
}
};

export const getAllUsersController = async(req: Request, res: Response) => {
  try {
    const users =await  getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserByIdController =async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await getUserById(parseInt(id));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};

export const loginUserController= async (req: Request < unknown, unknown, loginUserDto>, res: Response) => {
    const { username, password } = req.body;
    res.status(201).json({message: "Con esto funcionará el login", username, password});
}
// import { Request, Response } from "express";
// import { loginUser } from "../services/usersServices"; 

// export const loginUserController = async (req: Request, res: Response) => {
//   const { email, password } = req.body; 

//   try {
//     const user = await loginUser(email, password); // Llamamos a la función de servicio para validar el login

//     if (user) {
//       // Si el usuario es válido, enviamos un mensaje de éxito (puedes agregar un token si usas autenticación JWT)
//       res.status(200).json({ message: "Login exitoso", user });
//     } else {
//       // Si no se encuentra el usuario o la contraseña no es válida
//       res.status(401).json({ error: "Credenciales incorrectas" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error al intentar iniciar sesión" });
//   }
// };
