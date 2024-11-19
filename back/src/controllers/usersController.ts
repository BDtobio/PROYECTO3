
import { Request, Response } from "express"
import { getUserById, getAllUsers, registerUser,logingUserService } from "../services/usersServices"
import { loginUserDto, registerUserDto } from "../dtos/userDto";
import CredentialRepository from "../repositories/credentialRepository";
import { Credential } from "../entities/Credential";
// import { validateCredentialService } from "../services/credentialsService";
import { User } from "../entities/User";
import { createCredentialService } from "../services/credentialsService";
// import { getAppointmentById } from "../services/appointmentService";


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
        res.status(404).json({ message: "No se ha podido completar la solicitud", error });
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
export const loginUserController = async (req: Request < unknown, unknown, loginUserDto >, res: Response):Promise<void> => {
    
    // try {
        
    //     const response:loginUserDto | null = await logingUserService(req.body)
    //     res.status(200).json(response);
    // } catch(error) {
    //     res.status(400).json({ message: "No se ha podido completar la solicitud", error });
    // }
}

//                 CLASE
// export const registerUserController = async (req: Request< unknown, unknown,registerUserDto>, res: Response):void => {
//     try {
//         const response=await registerUser(req.body)
//         res.status(201).json({message: "Usuario registrado correctamente."})
//         } catch(error) {
//         res.status(400).json({
//             message: "Hubo un error en el registro",
//         data:error instanceof Error ? error.message : "error desconocido"
//     })
//     }
// }



