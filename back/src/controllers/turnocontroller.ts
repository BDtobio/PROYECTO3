import { Request, Response } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Turno } from "../entities/Turno";
import { enviarCorreo } from "../services/mailer";
interface TurnoBody {
  nombre: string;
  email: string;
  hora: string;
  mesa: number;
}
export const crearTurno = async (req: Request<{}, {}, TurnoBody>, res: Response) => {
  try {
    const turnoRepo = AppDataSource.getRepository(Turno);

    // Crear un objeto Turno a partir del body
    const nuevoTurno = turnoRepo.create(req.body);

    // Guardarlo en la DB → devuelve un solo objeto, no array
    const turnoGuardado: Turno = await turnoRepo.save(nuevoTurno);

    // Enviar correo usando el objeto guardado
    await enviarCorreo({
      to: turnoGuardado.email,
      subject: "Confirmación de turno",
      text: `Hola ${turnoGuardado.nombre}, tu turno a las ${turnoGuardado.hora} ha sido reservado.`,
    });

    res.status(201).json(turnoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando el turno", error });
  }
};
