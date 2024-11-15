import { Router } from "express";
import { getAllAppointmentsController,getAppointmentByIdController,createAppointmentController,cancelAppointmentController } from "../controllers/appointmentController";

const appointmentRoutes:Router=Router();
appointmentRoutes.get("/",getAllAppointmentsController)
appointmentRoutes.get("/:id",getAppointmentByIdController)
appointmentRoutes.post("/schedule",createAppointmentController)
appointmentRoutes.put("/cancel",cancelAppointmentController)

 export default appointmentRoutes;





