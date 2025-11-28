export interface registerUserDto {
  name: string;
  email: string;
  birthdate: string;  // ← CORRECTO
  nDni: number;
  username: string;
  password: string;
}

export interface loginUserDto{
    username:string
    password:string
}


export interface userDto {
  id: number;
  name: string;
  email: string;
  birthdate: string; // ← string SALIENTE
  nDni: number;
}


export interface loginUserSucessDto{
    login:boolean
     user:userDto
    
}