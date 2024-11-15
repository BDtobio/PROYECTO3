
import { UserModel } from "../config/appDataSource";
import { registerUserDto } from "../dtos/userDto";
import { User } from "../entities/User";

import { createCredential } from "./credentialsService";

export const getAllUsers=async():Promise<User[]>=>{
const users=await UserModel.find({
    relations: {
        appointments: true,
        }
})
    return users
}

export const getUserById=async(id:number):Promise<User| null>=>{
const user=await UserModel.findOneBy({
    id
})
return user
}

export const createUser = async (userData:registerUserDto): Promise<User> => {
    const newUser = await UserModel.create(userData);
    const savedUser = await UserModel.save(newUser);

    const username = userData.name;
    const password = userData.password;

    const credentialData = {
        username,
        password,
        user: savedUser.id,
    }
    const newCredential = await createCredential(credentialData);

    savedUser.credential= newCredential; 

    await UserModel.save(savedUser);


    return newUser;
}
    // const newUser = UserModel.create(userData);
    // const saveUser = await UserModel.save(newUser);
    // const username= userData.username;
    // const password= userData.password;

    // const credentialData = {
    //     username,
    //     password,
    //     user: saveUser,
    // };
    // await createCredential(credentialData);
  
    // return newUser;
// }

