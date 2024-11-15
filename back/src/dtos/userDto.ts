export  interface registerUserDto{
    name: string;
    email: string;
    birthdate: string;
    nDni: number;   
    username: string;   
     password: string;
}


export interface loginUserDto{
    username:string,
    email:string,
    password:string,
}