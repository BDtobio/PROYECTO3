
import UserRepository from "../repositories/userRepository";
import {  registerUserDto } from "../dtos/userDto";
import { loginUserDto } from "../dtos/userDto";
import { User } from "../entities/User";

// import { createCredentialService, validateCredentialService } from "./credentialsService";
import { AppDataSource } from "../config/appDataSource";
import { createCredentialService } from "./credentialsService";
// import { IUser } from "../interfaces/IUser";
// const usersList:User[]=[]
// let id:number=1

export const getAllUsers = async (): Promise<User[] | undefined> => {
    try {
      const users = await UserRepository.find({
        relations: ['appointments'], 
      });
      return users;
    } catch (error) {
      console.error('Error en el registro:', error);
      return undefined;
    }
  };
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const user = await UserRepository.findOne({
          where: { id },
          relations: ['appointments'], 
        });
        
        return user;
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null;
      }
    };

//      M          MI USER REGISTERR

export const registerUser = async (userData: registerUserDto): Promise<User> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
      await queryRunner.startTransaction()
      const newUser: User = UserRepository.create(userData);
      const savedUser = await queryRunner.manager.save(newUser);
      
      await queryRunner.commitTransaction();

      const username = userData.username;
      const password = userData.password;
      
      const credentialData = {
          username,
          password,
          user: savedUser.id,
      }
      const newCredential = await createCredentialService(credentialData);
      
      savedUser.credential = newCredential; 
      await queryRunner.manager.save(savedUser);

      
      return newUser;
   } catch (error) {
  await queryRunner.rollbackTransaction();
  console.error("Error en el registro:", error);
  throw new Error("Error al registrar el usuario");

  } finally {
  await queryRunner.release();
  }
}



//            FUNCION LOGIN


export const logingUserService=async(user:loginUserDto): Promise<void>=>{
// const usernameFound:Credential | null=await CredentialRepository.findOne({
//   where:{
//    createdAt:{
//     id:credentiald

//    }
//   }
// })
// return{
//   login:true
//   user:{
//     id:usernameFound?.id || 0,
//     name:usernameFound?.name ?? "",
//     email:usernameFound?.email ?? "",
//     birthdate:usernameFound?.birthdate ?? new Date,
//   }
// }

}






//               CLASE

//     export const registerUser = async (userData: registerUserDto):Promise<IUser> => {
//  const idCredentialsUser:number=await createCredentialService(userData.username,userData.password)  

//   const userObject:IUser={
//     id:id++,
//     name:userData.name,
//     birthdate:userData.birthdate,
//     email:userData.email,
//     nDni:userData.nDni,
//     credentialsId:idCredentialsUser
    
    
    
//     }
//     usersList.push(userObject)
//     return userObject
//     }
    



