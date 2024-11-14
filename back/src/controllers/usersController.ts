import { Request, Response } from "express"
import { getAllUsers } from "../services/usersServices";

export const getAllusersController=async(req:Request,res:Response)=>{
    try {
        const users = getAllUsers();
        res.status(200).json(users);  
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
}
export const getUserByIdController=async( req:Request,res:Response)=>{
   
}

export const registerUserController=async( req:Request,res:Response)=>{
   
}
export const loginUserController=async( req:Request,res:Response)=>{
   
}




// export const createUser=async(req:Request,res:Response)=>{
//     const {name,email,active}=req.body
//     const newUser:IUser=await createUserService({name,email,active})
//     res.status(201).json(newUser)
    
// }


// export const deleteUser=async(req:Request,res:Response)=>{
//     const {id}=req.body
//     await deleteUserService(id)
//     res.status(200).json({message:"eliminado coreectamente"})
// }