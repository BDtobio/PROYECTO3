
import UserRepository from "../repositories/userRepository";
import {  loginUserSucessDto, registerUserDto, userDto } from "../dtos/userDto";
import { loginUserDto } from "../dtos/userDto";
import { User } from "../entities/User";

// import { createCredentialService, validateCredentialService } from "./credentialsService";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../config/appDataSource";
import { createCredentialService } from "./credentialsService";
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
          userId: savedUser.id,
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

// export const loginUserService = async (user: loginUserDto): Promise<loginUserSucessDto> => {
//   const credentialId: number | undefined = await validateCredentialService(user.username, user.password);

//   const userFound: User | null = await UserRepository.findOne({
//     where: {
//       credentials: {
//         id: credentialId
//       }
//     }
//   })
//   return {
//     login: true,
//     user: {
//       id: userFound?.id ?? 0,
//       name: userFound?.name ?? "",
//       email: userFound?.email ?? "",
//       birthdate: userFound?.birthdate ?? new Date(),
//       nDni: userFound?.nDni ?? 0
//     }
//   }
// }

// const verifyPassword = async (userPassword: string, storedPassword: string): Promise<boolean> => {
//   return bcrypt.compare(userPassword, storedPassword); 
// };
// export const loginUser = async (username: string, password: string): Promise<any> => {
//   try {
//     // 1. Buscar las credenciales asociadas al username
//     const credential = await CredentialRepository.findOne({
//       where: { username: username }, // Buscar el username en la tabla de credenciales
//     });

//     if (!credential) {
//       throw new Error('Credenciales no encontradas'); // Si no encontramos las credenciales, lanzamos un error
//     }

//     // 2. Verificar si la contraseña es correcta
//     const passwordMatch = await verifyPassword(password, credential.password); // Comparamos la contraseña ingresada con la almacenada

//     if (!passwordMatch) {
//       throw new Error('Contraseña incorrecta'); // Si no coinciden las contraseñas, lanzamos un error
//     }

//     // 3. Buscar al usuario asociado a las credenciales usando el userId de CredentialDto
//     const userFound = await UserRepository.findOne({
//       where: { id: credential.userId }, // Usamos userId del DTO CredentialDto
//     });

//     if (!userFound) {
//       throw new Error('Usuario no encontrado'); // Si no encontramos el usuario, lanzamos un error
//     }

//     // 4. Devolver la respuesta con la información del usuario
//     return {
//       login: true,
//       user: {
//         id: userFound.id || 0,
//         name: userFound.name ?? '',
//         email: userFound.email ?? '',
//         birthdate: userFound.birthdate ?? new Date(),
//         nDni: userFound.nDni ?? 0,
//       },
//     };
//   } catch (error) {
//     console.error('Error en loginUser:', error);
//     throw new Error('Error en el proceso de login');
//   }
// };
// export const logingUserService=async(user:loginUserDto): Promise<loginUserSucessDto>=>{
//   const credentiald:number | undefined=await checkCredentials(user.username,user.password)
//   const userFound:User | null=await UserRepository.findOne({
//     where:{credential:{id:credentiald}
//     }
//   })
//   return{
//     login:true,
//     user:{
//       id:userFound?.id || 0,
//       name:userFound?.name ?? "",
//       email:userFound?.email ?? "",
//       birthdate:userFound?.birthdate ?? new Date,
//       nDni: userFound?.nDni ?? 0
//     }
//   }
  
//   }

