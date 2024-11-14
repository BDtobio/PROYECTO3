import { Router } from "express";
    import {getAllAppointmentsController,getAppointmentByIdController,createAppointmentController,cancelAppointmentController} from "../controllers/appointmentController";

const appointmentRoutes:Router=Router();
appointmentRoutes.get("/",getAllAppointmentsController)
appointmentRoutes.get("/:id",getAppointmentByIdController)
appointmentRoutes.post("/schedule",createAppointmentController)
appointmentRoutes.put("/cancel",cancelAppointmentController)

 export default appointmentRoutes;








// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

// GET /appointments => Obtener el detalle de un turno específico.

// POST /appointments/schedule => Agendar un nuevo turno.

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.