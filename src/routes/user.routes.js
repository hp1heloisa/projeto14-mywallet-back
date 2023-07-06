import { Router } from "express";
import { cadastro, login } from "../controllers/authController.js";

const userRouter = Router();
 
userRouter.app.post("/cadastro", cadastro);
userRouter.app.post("/login", login);

export default userRouter;