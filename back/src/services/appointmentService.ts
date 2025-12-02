import { AppDataSource } from "../config/appDataSource";
import { AppointmentDTO } from "../dtos/appointmentDto";
import { appointmentStatus } from "../interfaces/IAppointment";
import AppointmentRepository from "../repositories/appointmentRepository";
import UserRepository from "../repositories/userRepository";

export const getAllAppointments = async () => {
  const appointments = await AppointmentRepository.find({
    relations: ["user"], // traer el usuario si existe
    order: { date: "ASC", time: "ASC" }
  });

  return appointments.map(a => ({
    id: a.id,
    date: a.date,
    time: a.time,
    status: a.status,
    userId: a.userId || null,
    userName: a.user ? a.user.name : a.clientName || "Turno creado por Admin"
  }));
};

export const getAppointmentsById = async (id: number): Promise<AppointmentDTO | null> => {
  const appointment = await AppointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!appointment) throw new Error(`No se encontró turno con id ${id}`);

  return {
    id: appointment.id,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    userId: appointment.user.id,
    userName: appointment.user.name,
  };
};

export const getAppointmentsByUser = async (userId: number): Promise<AppointmentDTO[]> => {
  const appointments = await AppointmentRepository.find({
    where: { user: { id: userId } },
    relations: ["user"],
  });

  return appointments.map(a => ({
    id: a.id,
    date: a.date,
    time: a.time,
    status: a.status,
    userId: a.user.id,
    userName: a.user.name,
  }));
};

export const createAppointment = async (appointmentData: AppointmentDTO): Promise<AppointmentDTO> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

   await AppointmentRepository.validateExistingAppointment(
  appointmentData.userId,
  appointmentData.date,
  appointmentData.time
);

AppointmentRepository.validateAllowAppointment(
  appointmentData.date,
  appointmentData.time
);


    const user = await UserRepository.findOneBy({ id: appointmentData.userId });
    if (!user) throw new Error("Usuario no encontrado.");

    const newAppointment = AppointmentRepository.create({
      date: appointmentData.date,
      time: appointmentData.time,
      status: appointmentStatus.active,
      user,
    });

    const saved = await queryRunner.manager.save(newAppointment);
    await queryRunner.commitTransaction();

    return {
      id: saved.id,
      date: saved.date,
      time: saved.time,
      status: saved.status,
      userId: user.id,
      userName: user.name,
    };

  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

export const cancelAppointment = async (appointmentId: number): Promise<boolean> => {
  const appointment = await AppointmentRepository.findOneBy({ id: appointmentId });

  if (!appointment) throw new Error("Turno no encontrado.");

  if (appointment.status === "cancelled")
    throw new Error("El turno ya está cancelado.");

  const result = await AppointmentRepository.update(
    { id: appointmentId },
    { status: "cancelled" }
  );

  return result.affected === 1;
};
