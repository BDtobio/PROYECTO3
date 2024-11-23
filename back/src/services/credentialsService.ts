import { ICredential } from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";
import { CredentialDto } from "../dtos/credentialDto";
import UserRepository from "../repositories/userRepository";
import CredentialRepository from "../repositories/credentialRepository";

import bcrypt from "bcrypt"
let credentialsList: ICredential[] = [];
let id:number=1



// export const createCredentialService= async (credentialsData: CredentialDto): Promise<Credential> => {

//     const user = await CredentialRepository.findOne({ where: { id: credentialsData.userId } });
//     if (!user) {
//         throw new Error("User not found");
//     }
//     const newCredential = CredentialRepository.create({
//         username: credentialsData.username,
//         password: credentialsData.password,
//         user, 
//     });
//     await CredentialRepository.save(newCredential);
//     return newCredential;

// }

export const createCredentials: (username: string, password: string) => Promise<Credential> = 
async (username: string, password: string): Promise<Credential> => {
  const encryptedPassword: string = await passwordEncryption(password);

  const newCredentials = {
    username,
    password: encryptedPassword,
  };

  const credentialsSaved: Credential = CredentialRepository.create(newCredentials)

  return await CredentialRepository.save(credentialsSaved) 
};



const passwordEncryption: (password: string) => Promise<string> = 
async (password: string): Promise<string> => {
  const passwordEncrypted: string = await bcrypt.hash(password, 10);
  return passwordEncrypted;
};


export const validateCredentialService = async (username: string, password: string): Promise<number | undefined> => {
  const usernameFound: Credential | null = await CredentialRepository.findOneBy({ username });

  if (!usernameFound) {
      throw new Error(`El usuario ${username} no fue encontrado`);
  }

  const isPasswordValid = await bcrypt.compare(password, usernameFound.password);

  if (!isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
  }

  return usernameFound.id;
};







// export const validateCredentialService = async (username: string, password: string): Promise<number | undefined> => {
//     const usernameFound: Credential | null = await CredentialRepository.findOneBy({ username });

//     if (!usernameFound) {
//         throw new Error(`El usuario ${username} no fue encontrado`);
//     }

//     const isPasswordValid = await bcrypt.compare(password, usernameFound.password);

//     if (!isPasswordValid) {
//         throw new Error("Usuario o contraseña incorrectos");
//     }

//     return usernameFound.id;
// };






// export const checkCredentials=async(username:string,password:string): Promise<number | undefined>=>{
//     const usernameFound:ICredential | undefined=credentialsList.find(credential => credential.username===username)
//     const crypPassword:string=await crypPass(password)
//     if(!usernameFound) throw new Error(`el usuario ${username} no fue encontrado`)
//         if(usernameFound.password !==crypPassword) throw new Error(`usuario o contraseña incorrectos`)
//             else return usernameFound.id
    
//   }
  

// const crypPass=async(password:string):Promise<string>=>{
//     const enconder= new TextEncoder()
//     const data=enconder.encode(password)
//     const hash=await crypto.subtle.digest("SHA-256",data)
//     const hashArray=Array.from(new Uint8Array(hash))
//     const passCrypt=hashArray.map(b=>b.toString(16).padStart(2, "0")).join("")
//     return passCrypt
// }










//  c laseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee



// const crypPass = async (password: string): Promise<string> => {
 
//     const encoder = new TextEncoder();
//     const data = encoder.encode(password);

//     const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    
//     const hashArray = Array.from(new Uint8Array(hashBuffer));

   
//     const passCrypt = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

//     return passCrypt;
// };


// export const createCredentialService:(a:string,b:string)=>Promise<number>=async(username:string,password:string):Promise<number> => {
//     const passwordEncripted= await   crypPass(password)
//     const credentialObject={
//         id,
//         username,
//         password:passwordEncripted

//     }
// credentialsList.push(credentialObject)
//    return id++
// }

// export const checkCredentials= async(username:string,password:string):Promise<number | undefined>=> {

// const usernameFound:ICredential | undefined=credentialsList.find(credential=>credential.username===username)
// const crypPassword:string=await crypPass(password)
// if(!usernameFound)throw new Error(`usuario o contraseña erronea`)
//     if(usernameFound.password !== crypPassword)throw new Error(`usuario o contraseña erronea`)
//         else return usernameFound.id

// }
