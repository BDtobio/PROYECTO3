
import IUser from "../interfaces/IUser"
import createCredential from "./credentialsService";
let users:IUser[]=[]
let id:number =1;


export const getAllUsers=async():Promise<IUser[]>=>{

    return users
}

export const getUserById=async(id:number):Promise<IUser| undefined>=>{

    return users.find(user => user.id === id);
}

export const createUser = async (name: string, email: string, birthdate: Date, nDni:number, username: string, password: string): Promise<number> => {
    const credentialsId = await createCredential(username, password);

    const newUser: IUser = {
        id,
        name,
        email,
        birthdate,
        nDni,
        credentialsId,
    };
    users.push(newUser);
    id++
    return newUser.id;
}

