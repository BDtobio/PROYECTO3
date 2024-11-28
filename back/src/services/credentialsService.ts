import { ICredential } from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";
import { CredentialDto } from "../dtos/credentialDto";
import UserRepository from "../repositories/userRepository";
import CredentialRepository from "../repositories/credentialRepository";

import bcrypt from "bcrypt"
let credentialsList: ICredential[] = [];
let id:number=1



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


