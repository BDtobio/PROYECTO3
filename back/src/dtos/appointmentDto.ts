import { appointmentStatus } from "../interfaces/IAppointment";

export interface AppointmentDTO {
   id?: number;        // 👈 AGREGADO
  date: Date;
  time: string;
  status?: string;
  userId: number;
  userName?: string;
    }