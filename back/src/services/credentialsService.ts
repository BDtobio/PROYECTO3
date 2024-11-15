import { ICredential } from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";

import { User } from "../entities/User";
import { CredentialModel, UserModel } from "../config/appDataSource";
import { CreateCredentialDto } from "../dtos/credentialDto";
let credentials: ICredential[] = [];

let id:number =1;


// export const createCredential = async (credentialData:{
//         username:string;
//         password: string;
//         user: User;
//     }
// ): Promise<Credential> => {


//     const newCredential=CredentialModel.create(credentialData)

//     await CredentialModel.save(newCredential);
    
//     return newCredential


// }
export const createCredential= async (credentialsData: CreateCredentialDto): Promise<Credential> => {

    const user = await UserModel.findOne({ where: { id: credentialsData.user } });
    if (!user) {
        throw new Error("User not found");
    }
    const newCredential = CredentialModel.create({
        username: credentialsData.username,
        password: credentialsData.password,
        user, 
    });
    await CredentialModel.save(newCredential);
    return newCredential;

}


export const validateCredential = async (username: string, password: string): Promise<number | null> => {
    const credential = credentials.find(cred => cred.username === username);
    if (credential && credential.password === password) {
        return credential.id; 
    }
    return null;
}
