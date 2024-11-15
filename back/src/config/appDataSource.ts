import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "tobias45280092",
    database: "modulo3",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User,Appointment,Credential],
    subscribers: [],
    migrations: [],
})

export const UserModel=AppDataSource.getRepository(User)

export const AppointmentModel=AppDataSource.getRepository(Appointment)
export const CredentialModel=AppDataSource.getRepository(Credential)