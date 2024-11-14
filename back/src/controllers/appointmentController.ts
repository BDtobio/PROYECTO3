import { Request, Response } from 'express';
import { createAppointment, getAllAppointments, getAppointmentById, cancelAppointment } from '../services/appointmentService';


export const getAllAppointmentsController = async(req: Request, res: Response) => {
  try {
    const appointments =await getAllAppointments();
    res.status(200).json(appointments); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};


export const getAppointmentByIdController = async(req: Request, res: Response) => {
  const { id } = req.params;
  const appointment =await getAppointmentById(parseInt(id));

  if (appointment) {
    res.status(200).json(appointment);  
  } else {
    res.status(404).json({ error: 'Turno no encontrado' });
  }
};


export const createAppointmentController = async (req: Request, res: Response): Promise<void>  => {
  const { date, time, userId } = req.body;

  try {
    if (!userId) {
     res.status(400).json({ error: 'El ID de usuario es requerido' });
     return  
    }

    const newAppointment =await createAppointment(date, time, userId);
    res.status(201).json({newAppointment}); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el turno' });
  }
};


export const cancelAppointmentController = async(req: Request, res: Response) => {
  const { id } = req.body;
  
  try {
    const cancelledAppointment =await cancelAppointment(parseInt(id));

    if (cancelledAppointment) {
      res.status(200).json(cancelledAppointment);  
    } else {
      res.status(404).json({ error: 'Turno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar el turno' });
  }
};
