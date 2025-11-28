import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/credentialRepository";
import bcrypt from "bcrypt";

// SOLO encripta y crea el objeto, NO lo guarda todavía
export const createCredentials = async (username: string, password: string): Promise<Credential> => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newCredentials = CredentialRepository.create({
    username,
    password: encryptedPassword,
  });

  return newCredentials; // NO guardamos acá
};

// VALIDACIÓN LOGIN
export const validateCredentialService = async (username: string, password: string): Promise<number> => {
  const credential = await CredentialRepository.findOneBy({ username });

  if (!credential) {
    throw new Error(`El usuario ${username} no fue encontrado`);
  }

  const isValid = await bcrypt.compare(password, credential.password);

  if (!isValid) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  return credential.id;
};
