import { Router } from "express";
import { getAllUsersController,getUserByIdController,registerUserController,loginUserController } from "../controllers/usersController";
// import auth from "../middlewares/auth";
const userRoutes:Router=Router();
userRoutes.get("/",getAllUsersController)
userRoutes.get("/:id",getUserByIdController)
userRoutes.post("/register",registerUserController)
userRoutes.post("/login",loginUserController)

 export default userRoutes;