import { appointmentStatus } from "../interfaces/IAppointment";

export interface AppointmentDTO {
    date: Date;
    time: string;
    status?: string;
    userId: number; 
    }