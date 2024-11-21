
import UserRepository from "../repositories/userRepository";
import {  loginUserSucessDto, registerUserDto } from "../dtos/userDto";
import { loginUserDto } from "../dtos/userDto";
import { User } from "../entities/User";
import { checkCredentials } from "./credentialsService";
// import { createCredentialService, validateCredentialService } from "./credentialsService";
import { AppDataSource } from "../config/appDataSource";
import { createCredentialService } from "./credentialsService";
import CredentialRepository from "../repositories/credentialRepository";
import { Credential } from "../entities/Credential";
// import { IUser } from "../interfaces/IUser";


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
export const getUserById = async (id: number): Promise<User> => {
        const user = await UserRepository.findOne({
          where: { id },
          relations: ['appointments'], 
        });
        if(!user){
          throw new Error(`no se encontro el usuario con id:${id}`)
        }
        return user;
        
      };



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



export const logingUserService=async(user:loginUserDto): Promise<loginUserSucessDto>=>{
  const credentiald:number | undefined=await checkCredentials(user.username,user.password)
  const userFound:User | null=await UserRepository.findOne({
    where:{credential:{id:credentiald}
    }
  })
  return{
    login:true,
    user:{
      id:userFound?.id || 0,
      name:userFound?.name ?? "",
      email:userFound?.email ?? "",
      birthdate:userFound?.birthdate ?? new Date,
      nDni: userFound?.nDni ?? 0
    }
  }
  
  }


