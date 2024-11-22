export  interface registerUserDto{
    name: string;
    email: string;
    birthdate: Date;
    nDni:number;   
    username: string;   
     password: string;
}


export interface loginUserDto{
    username:string
    password:string
}


export interface userDto{
    id:number
    name:string
    email:string
    birthdate:Date
    nDni:number
  
}

export interface loginUserSucessDto{
    login:boolean
     user:userDto
    
}