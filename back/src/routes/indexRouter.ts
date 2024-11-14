import { Router } from "express";
import userRoutes from "./userRoutes";
import appointmentRoutes from "./appointmentRoutes";

const indexRouter: Router = Router();


indexRouter.use("/users", userRoutes); 
indexRouter.use("/appointments", appointmentRoutes); 
export default indexRouter;