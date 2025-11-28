import { Router } from "express";
import { getAllAppointmentsController,getAppointmentsByIdController,createAppointmentController,cancelAppointmentController } from "../controllers/appointmentController";

const appointmentRoutes:Router=Router();
appointmentRoutes.get("/",getAllAppointmentsController)
appointmentRoutes.get("/:id",getAppointmentsByIdController)
appointmentRoutes.post("/schedule",createAppointmentController)
appointmentRoutes.put("/cancel/:id",cancelAppointmentController)

 export default appointmentRoutes;





