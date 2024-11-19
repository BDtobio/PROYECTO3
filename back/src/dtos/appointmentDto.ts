import { appointmentStatus } from "../interfaces/IAppointment";

export interface AppointmentDTO {
    date: string;
    time: string;
    status?: string;
    userId: number; 
    }