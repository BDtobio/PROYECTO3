import { Router } from "express";
import {getAllusersController,getUserByIdController,registerUserController,loginUserController} from "../controllers/usersController";
// import auth from "../middlewares/auth";
const userRoutes:Router=Router();
userRoutes.get("/",getAllusersController)
userRoutes.get("/:id",getUserByIdController)
userRoutes.post("/register",registerUserController)
userRoutes.post("/login",loginUserController)
// router.delete("/users",deleteUser)
 export default userRoutes;