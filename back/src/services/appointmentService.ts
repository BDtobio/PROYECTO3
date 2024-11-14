import IAppointment, { appointmentStatus } from "../interfaces/IAppointment"; 
import IUser from "../interfaces/IUser";

import { getUserById } from "./usersServices";

let appointments: IAppointment[] = [];
let id:number= 1;

export const getAllAppointments = async (): Promise<IAppointment[]> => {
    return appointments;
}

export const getAppointmentById = async (id: number): Promise<IAppointment | undefined> => {
    return appointments.find(appointment => appointment.id === id);
}

export const createAppointment = async (date: Date, time: string, userId: number): Promise<number> => {
    const userExists = await getUserById(userId);
    if (!userExists) {
        throw new Error("User not found");
    }

    const newAppointment: IAppointment = {
        id,
        date,
        time,
        userId,
        status: appointmentStatus.active 
    };
    appointments.push(newAppointment);
    id++;
    return newAppointment.id; 
}

export const cancelAppointment = async (id: number): Promise<boolean> => {
    const appointment = await getAppointmentById(id);
    if (!appointment) {
        throw new Error("Appointment not found");
    }

    appointment.status = appointmentStatus.cancelled;
    return true;
}
