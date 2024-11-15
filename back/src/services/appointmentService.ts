
import { AppointmentModel } from "../config/appDataSource";
import { Appointment} from "../entities/Appointment";
import { appointmentStatus } from "../interfaces/IAppointment";


// let appointments: IAppointment[] = [];
// let id:number= 1;

export const getAllAppointments = async (): Promise<Appointment[]> => {
    const appointments=await AppointmentModel.find()
    return appointments
}

export const getAppointmentById = async (id: number): Promise<Appointment | null> => {
    const appointment=await AppointmentModel.findOneBy({
    id,
    })
    

    return appointment
}

// export const createAppointment = async (appointmentData:AppointmentDTO): Promise<Appointment> => {
//     const newAppointment=AppointmentModel.create({
        
//         date:appointmentData.date,
//         time:appointmentData.time,
//         status:appointmentData.status,
//         userId:appointmentData.userId,
//     });
//     const saveAppointment = await AppointmentModel.save(newAppointment);

//     return saveAppointment;
// };

export const createAppointment = async (appointmentData: Appointment): Promise<Appointment> => {
    
    // const existingAppointment = await AppointmentModel.findOneBy({
    //    id:appointmentData.id, 
    // });

   
    // if (existingAppointment && existingAppointment.status === appointmentStatus.active) {
    //     throw new Error("Ya existe un turno activo con este ID");
    // }

    const newAppointment = AppointmentModel.create(appointmentData);
    const savedAppointment = await AppointmentModel.save(newAppointment);

    return savedAppointment;
};



export const cancelAppointment = async (id: number): Promise<boolean> => {

    const appointment = await getAppointmentById(id); 
    if (!appointment) {
        throw new Error("turno no encontrado");
    }

    appointment.status = appointmentStatus.cancelled;
   
    await AppointmentModel.save(appointment);

    return true;
};


