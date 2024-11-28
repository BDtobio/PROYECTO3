
import UserRepository from "../repositories/userRepository";
import {  loginUserSucessDto, registerUserDto, userDto } from "../dtos/userDto";
import { loginUserDto } from "../dtos/userDto";
import { User } from "../entities/User";

// import { createCredentialService, validateCredentialService } from "./credentialsService";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../config/appDataSource";
import { createCredentials, validateCredentialService } from "./credentialsService";
import CredentialRepository from "../repositories/credentialRepository";
import { Credential } from "../entities/Credential";
import { IUser } from "../interfaces/IUser";
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


      export const registerUser: (userData: registerUserDto) => Promise<userDto> =
      async (userData: registerUserDto): Promise<userDto> => {
       const CredentialsUser = await createCredentials(
         userData.username,
         userData.password
       ); 
     
       const newUserObject = {
         name: userData.name,
         email: userData.email,
         birthdate: userData.birthdate,
         nDni: userData.nDni,
         credentials: CredentialsUser,
       };
     
       const newUser = UserRepository.create(newUserObject)
     
       return await UserRepository.save(newUser) 
     };
     


export const loginUser= async (user: loginUserDto): Promise<loginUserSucessDto> => {
  const credentialId: number | undefined = await validateCredentialService(user.username, user.password);

  const userFound: User | null = await UserRepository.findOne({
    where: {
      credentials: {
        id: credentialId
      }
    }
  })
  return {
    login: true,
    user: {
      id: userFound?.id ?? 0,
      name: userFound?.name ?? "",
      email: userFound?.email ?? "",
      birthdate: userFound?.birthdate ?? new Date(),
      nDni: userFound?.nDni ?? 0
    }
  }
}

