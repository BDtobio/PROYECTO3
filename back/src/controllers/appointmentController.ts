
import { Request, Response } from "express"
import { AppointmentDTO } from "../dtos/appointmentDto";
import { cancelAppointment, createAppointment, getAllAppointments, getAppointmentsById } from "../services/appointmentService";
import { PostgresError } from "../interfaces/ErrorInterface";

export const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointments();
        res.status(200).json({ appointments });
     } catch(err) {
        res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
}



export const getAppointmentByIdController = async (req: Request< { id: string} >, res: Response) => {
    try {
        const { id } = req.params;
       
        const appointment = await getAppointmentsById(Number(id));
        res.status(200).json({appointment});
    } catch(err) {
        res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
}

export const createAppointmentController = async (req: Request< unknown, unknown, AppointmentDTO>, res: Response): Promise<void> =>  {
    const { date, time, userId } = req.body;
    try {       
        if (!req.body.userId) {
            res.status(400).json("No se pudo completar la solicitud");
            return;
        }
        const newAppointment = await createAppointment({
        date,
        time,
        userId
        });

        res.status(201).json({ newAppointment });
        return;
    
    } catch (error) {
        const err = error as PostgresError
            res.status(400).json({ message: "Error en el servidor", 
                data: err instanceof Error ? err.detail ? err.detail : err.message : "error desconocido"});
            return;
        }
    }


export const cancelAppointmentController= async (req: Request< { id: string } >, res: Response) => {
    try {
    const { id } = req.params;
    console.log(req.params)
    const appointment = await cancelAppointment(Number(id));
    console.log(req.params)
    

        res.status(200).json({message: "Turno cancelado", appointment: appointment});
    } catch(err) {
     res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
}


