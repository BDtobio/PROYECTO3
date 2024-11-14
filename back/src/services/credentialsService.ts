import ICredential from "../interfaces/ICredential"; 
let credentials: ICredential[] = [];

let id:number =1;


export const createCredential = async (username: string, password: string): Promise<number> => {
    const newCredential: ICredential = {
        id,
        username,
        password,
    };
    credentials.push(newCredential);
    id++;
    return newCredential.id; 
    


}


export const validateCredential = async (username: string, password: string): Promise<number | null> => {
    const credential = credentials.find(cred => cred.username === username);
    if (credential && credential.password === password) {
        return credential.id; // 
    }
    return null;
}

export default createCredential;