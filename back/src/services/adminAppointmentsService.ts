import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";

const appointmentRepo = AppDataSource.getRepository(Appointment);
const userRepo = AppDataSource.getRepository(User);

// ========================
// 🟩 CREAR TURNO (ADMIN)
// ========================
export const createAppointmentAdmin = async (userId: number, date: string, time: string) => {
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) throw new Error("Usuario no encontrado.");

  const newAppointment = appointmentRepo.create({
    user,
    date,
    time,
    status: "active",
  });

  return await appointmentRepo.save(newAppointment);
};

// ========================
// 🟨 EDITAR TURNOS (ADMIN)
// ========================
export const updateAppointmentAdmin = async (
  id: number,
  date?: string,
  time?: string,
  status?: string
) => {
  const turno = await appointmentRepo.findOne({ where: { id } });

  if (!turno) throw new Error("Turno no encontrado.");

  if (date) turno.date = new Date(date);  // ← FIX: convertir string a Date
  if (time) turno.time = time;
  if (status) turno.status = status;

  return await appointmentRepo.save(turno);
};


// ========================
// 🟥 ELIMINAR TURNOS (ADMIN)
// ========================
export const deleteAppointmentAdmin = async (id: number) => {
  const turno = await appointmentRepo.findOne({ where: { id } });

  if (!turno) throw new Error("Turno no encontrado.");

  await appointmentRepo.remove(turno);
  return true;
};
