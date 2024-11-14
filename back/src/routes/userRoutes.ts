import { Router } from "express";
import {getAllUsersController,getUserByIdController,registerUserController} from "../controllers/usersController";
// import auth from "../middlewares/auth";
const userRoutes:Router=Router();
userRoutes.get("/",getAllUsersController)
userRoutes.get("/:id",getUserByIdController)
userRoutes.post("/register",registerUserController)
userRoutes.post("/login",)
// router.delete("/users",deleteUser)
 export default userRoutes;