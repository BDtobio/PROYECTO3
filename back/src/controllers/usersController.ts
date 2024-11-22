
import { Request, Response } from "express"
import { getUserById, getAllUsers, registerUser} from "../services/usersServices"
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
// export const loginUserController = async (
//     req: Request<unknown, unknown, loginUserDto>, 
//     res: Response
//   ): Promise<void> => {
//     try {
//       // Extraemos username y password directamente desde req.body
//       const { username, password } = req.body;
  
//       // Llamamos a la función loginUser pasando solo username y password
//       const response: loginUserSucessDto = await loginUser(username, password);
  
//       // Si todo va bien, retornamos la respuesta de éxito
//       res.status(200).json({
//         message: 'Inicio de sesión exitoso',
//         data: response,
//       });
//     } catch (error) {
//       // Si ocurre un error, se captura y se retorna un mensaje adecuado
//       res.status(400).json({
//         message: 'Hubo un error al intentar iniciar sesión, por favor intente nuevamente.',
//         error: error instanceof Error ? error.message : "error desconocido",
//       });
//     }
//   };

// export const loginUserController = async (req: Request<unknown,unknown,loginUserDto>, res: Response):Promise<void> => {
//     try {    
//       const response:loginUserSucessDto| null=await
//       loginUser(req.body)
//        res.status(200).json({response});
//     } catch(error) {
//       res.status(400).json({
//         message: 'Hubo un error al intentar iniciar sesión, por favor intente nuevamente.',
//         data:error instanceof Error ? error.message:"error desconocido"})
//     }
  

// }



