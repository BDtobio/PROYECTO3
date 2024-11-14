import { Router } from "express";
import {getAllAppointments,getAppointmentById,scheduleAppointment,cancelAppointment} from "../controllers/appointmentController";

const appointmentRoutes:Router=Router();
appointmentRoutes.get("/",getAllAppointments)
appointmentRoutes.get("/:id",getAppointmentById)
appointmentRoutes.post("/schedule",scheduleAppointment)
appointmentRoutes.put("/cancel",cancelAppointment)

 export default appointmentRoutes;








// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

// GET /appointments => Obtener el detalle de un turno específico.

// POST /appointments/schedule => Agendar un nuevo turno.

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.