export  interface registerUserDto{
    name: string;
    email: string;
    birthdate: Date;
    nDni:number;   
    username: string;   
     password: string;
}


export interface loginUserDto{
    username:string,
    // email:string,
    password:string,
}


// export interface userDto{
//     id:UserFound?.id,
//     username:string,
//     email:string,
//     password:string,
// }
// export interface loginUserSucessDto{
//  user:userDto
// }