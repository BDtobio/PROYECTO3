

import { AppDataSource } from "../config/appDataSource";
import { AppointmentDTO } from "../dtos/appointmentDto";

import  { appointmentStatus } from "../interfaces/IAppointment";
import AppointmentRepository from "../repositories/appointmentRepository";
import UserRepository from "../repositories/userRepository";

export const getAllAppointments = async (): Promise<AppointmentDTO[]> => {
  const appointments = await AppointmentRepository.find({
    relations: {
        user: true,  
    }
  });
  const appointmentDTO: AppointmentDTO[] =appointments.map(appointment => ({
    date: appointment.date, 
    time: appointment.time, 
    status: appointment.status, 
    userId: appointment.user.id, 
  }));

return appointmentDTO;
}

export const getAppointmentsById = async (id: number): Promise<AppointmentDTO | null> => {

  
  const appointment = await AppointmentRepository.findOne({
    where: { id },
    relations: ["user"], 
  });

  if (!appointment) {
    throw new Error(`No se encontró la cita con id: ${ id }`);
  }
  const appointmentsDTO: AppointmentDTO={
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    userId: appointment.user.id,  
  };

  return appointmentsDTO;
};





export const createAppointment = async (appointmentData: AppointmentDTO): Promise<AppointmentDTO | undefined> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
  
    await queryRunner.startTransaction(); 
    await AppointmentRepository.validateExistingAppointment(appointmentData.userId,appointmentData.date,appointmentData.time);
    AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);
    if (!appointmentData.userId) {
      throw new Error("El ID de usuario es obligatorio para crear un turno.");
    }
    
    const user = await UserRepository.findOneBy({ id: appointmentData.userId });
    
    if (!user) {
      throw new Error("El usuario con el ID especificado no existe.");
    }
    const newAppointment = AppointmentRepository.create({
      date: appointmentData.date,
      time: appointmentData.time,
      status: appointmentStatus.active,  
      user: user, 
    });

    newAppointment.user = user; 

    newAppointment.status = appointmentStatus.active;

    const savedAppointment = await queryRunner.manager.save(newAppointment); 

    await queryRunner.commitTransaction();

    return  {
    date: savedAppointment.date,
    time: savedAppointment.time,
    status: savedAppointment.status,
    userId: savedAppointment.user.id, 
  };
  } catch(error){
    await queryRunner.rollbackTransaction();
    if (error) {
      throw new Error(`${error}`);
    }
  } finally {
    await queryRunner.release();
  }
};


export const cancelAppointment = async (appointmentId: number): Promise<boolean | undefined> => {
  try {
    console.log("ID recibido en el servicio:", appointmentId);
    
   
    const appointment = await AppointmentRepository.findOneBy({ id: appointmentId });
    console.log("Turno encontrado en la base de datos:", appointment);
    
    if (!appointment) {
      console.error("Error: Turno no encontrado para ID:", appointmentId);
      throw new Error("Turno no encontrado");
    }
    
   
    if (appointment.status === 'cancelled') {
      console.error("Error: El turno ya está cancelado y no puede ser cancelado nuevamente");
      throw new Error("El turno ya está cancelado y no puede ser cancelado nuevamente");
    }
    
 
    const result = await AppointmentRepository.update({ id: appointmentId }, { status: 'cancelled' });
    console.log("Resultado del update:", result);
    
    if (result.affected === 0) {
      console.error("Error: No se pudo actualizar el estado del turno para ID:", appointmentId);
      throw new Error("No se pudo actualizar el estado del turno");
    }
    
    console.log("Estado del turno actualizado con éxito");
    return true;
  } catch (err) {
    console.log({ err });
    throw new Error('Error al cancelar el turno');
  }
};

