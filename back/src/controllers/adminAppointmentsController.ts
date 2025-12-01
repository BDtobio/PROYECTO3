import { Request, Response } from "express";
import {
  createAppointmentAdmin,
  updateAppointmentAdmin,
  deleteAppointmentAdmin,
} from "../services/adminAppointmentsService";

export const adminCreateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, date, time } = req.body;

    const newTurno = await createAppointmentAdmin(Number(userId), date, time);

    res.status(201).json({
      message: "Turno creado correctamente",
      appointment: newTurno
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const adminUpdateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, time, status } = req.body;

    const turno = await updateAppointmentAdmin(Number(id), date, time, status);

    res.status(200).json({
      message: "Turno actualizado correctamente",
      appointment: turno
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const adminDeleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteAppointmentAdmin(Number(id));

    res.status(200).json({
      message: "Turno eliminado correctamente"
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

