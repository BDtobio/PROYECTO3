import { AppDataSource } from "../config/appDataSource";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User);

export default UserRepository;