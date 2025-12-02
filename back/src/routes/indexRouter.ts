import { Router } from "express";
import userRoutes from "./userRoutes";
import appointmentRoutes from "./appointmentRoutes";
import appointmentAdminRoutes from "./appointmentsAdminRoutes";

const indexRouter: Router = Router();

indexRouter.use("/users", userRoutes);

// 🔥 PRIMERO LAS RUTAS ADMIN (evita confundir "admin" con un id)
indexRouter.use("/appointments/admin", appointmentAdminRoutes);

// 🔥 DESPUÉS LAS RUTAS DE TURNOS NORMALES
indexRouter.use("/appointments", appointmentRoutes);

export default indexRouter;
