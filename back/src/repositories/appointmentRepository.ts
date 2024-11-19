import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";

const AppointmentRepository = AppDataSource.getRepository(Appointment);

export default AppointmentRepository;