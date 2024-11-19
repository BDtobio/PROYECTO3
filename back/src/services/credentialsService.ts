import { ICredential } from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";
import { CreateCredentialDto } from "../dtos/credentialDto";
import UserRepository from "../repositories/userRepository";
import CredentialRepository from "../repositories/credentialRepository";
import { error } from "console";
const bcrypt = require('bcrypt');
let credentialsList: ICredential[] = [];
let id:number=1



export const createCredentialService= async (credentialsData: CreateCredentialDto): Promise<Credential> => {

    const user = await UserRepository.findOne({ where: { id: credentialsData.user } });
    if (!user) {
        throw new Error("User not found");
    }
    const newCredential = CredentialRepository.create({
        username: credentialsData.username,
        password: credentialsData.password,
        user, 
    });
    await CredentialRepository.save(newCredential);
    return newCredential;

}


export const validateCredentialService = async (username: string, password: string): Promise<number | null> => {
    const credential =credentialsList.find(cred => cred.username === username);
    if (credential && credential.password === password) {
        return credential.id; 
    }
    return null;
}





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
