import { Router } from "express";
import { cadastro, login } from "../controllers/authController.js";

const userRouter = Router();
 
userRouter.post("/cadastro", cadastro);
userRouter.post("/login", login);

export default userRouter;