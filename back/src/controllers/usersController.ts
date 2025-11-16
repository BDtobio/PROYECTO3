
import { Request, Response } from "express"
import { getUserById, getAllUsers, registerUser,loginUser} from "../services/usersServices"
import { loginUserDto, loginUserSucessDto, registerUserDto } from "../dtos/userDto";


export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({users})
    } catch(error) {
        res.status(400).json({ message: "No se ha podido completar la solicitud", error });
    }
} 




export const getUserByIdController = async (req: Request< { id: string } >, res: Response) => {
    try {
        const { id } =  req.params;
        const user = await getUserById(parseInt(id));
        res.status(200).json({user})
    } catch(error) {
        res.status(404).json({ message: "usuario no encontrado", error });
    }
}

export const registerUserController = async (req: Request< unknown, unknown,registerUserDto>, res: Response) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json({message: "Usuario registrado correctamente.",
            user: newUser.name
        })
    } catch {
        res.status(400).json({message: "Hubo un error en el registro"})
    }
}
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;

  // ADMIN LOGIN
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.status(200).json({
      login: true,
      role: "admin",
      user: { id: "admin" } // <<=== CAMBIO IMPORTANTE
    });
    return;
  }

  // NORMAL USER LOGIN
  try {
    const response: loginUserSucessDto = await loginUser(req.body);

    res.status(200).json({
      ...response,
      role: "user",
    });
  } catch (error) {
    res.status(400).json({
      message: "Usuario o contraseña incorrectos",
      error,
    });
  }
};

// export const loginAdminController: RequestHandler = async (req, res) => {
//   const { username, password } = req.body;

//   const ADMIN_USER = process.env.ADMIN_USER;
//   const ADMIN_PASS = process.env.ADMIN_PASS;

//   if (username === ADMIN_USER && password === ADMIN_PASS) {
//     res.status(200).json({
//       ok: true,
//       message: "Login exitoso"
//     });
//     return;
//   }

//   res.status(401).json({
//     ok: false,
//     message: "Usuario o contraseña incorrectos"
//   });
// };
