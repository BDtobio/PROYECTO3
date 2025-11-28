import UserRepository from "../repositories/userRepository";
import { loginUserSucessDto, registerUserDto, userDto } from "../dtos/userDto";
import { loginUserDto } from "../dtos/userDto";
import { User } from "../entities/User";
import { createCredentials } from "./credentialsService";
import CredentialRepository from "../repositories/credentialRepository";
import bcrypt from "bcrypt"; // ← FALTABA ESTO

export const getAllUsers = async (): Promise<User[]> => {
  const users = await UserRepository.find({
    relations: ['appointments'],
  });
  return users;
};

export const getUserById = async (id: number): Promise<User> => {
  const user = await UserRepository.findOne({
    where: { id },
    relations: ['appointments'],
  });
  if (!user) {
    throw new Error(`no se encontró el usuario con id: ${id}`);
  }
  return user;
};

export const registerUser = async (userData: registerUserDto): Promise<userDto> => {
  const credentials = await createCredentials(userData.username, userData.password);

  const newUser = UserRepository.create({
    name: userData.name,
    email: userData.email,
    birthdate: new Date(userData.birthdate),
    nDni: userData.nDni,
    credentials,
  });

  const savedUser = await UserRepository.save(newUser);

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    birthdate: savedUser.birthdate.toISOString().split("T")[0],
    nDni: savedUser.nDni,
  };
};

export const loginUser = async (data: loginUserDto): Promise<loginUserSucessDto> => {
  const { username, password } = data;

  const credential = await CredentialRepository.findOne({
    where: { username },
    relations: ["user"],
  });

  if (!credential) {
    throw new Error("Usuario no encontrado");
  }

  const isValid = await bcrypt.compare(password, credential.password);

  if (!isValid) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const user = credential.user;

  return {
    login: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate.toISOString().split("T")[0],
      nDni: user.nDni,
    },
  };
};
