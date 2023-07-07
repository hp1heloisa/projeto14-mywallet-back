import { Router } from "express";
import { cadastro, login } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { schemaCadastro, schemaLogin } from "../schemas/user.schemas.js";

const userRouter = Router();
 
userRouter.post("/cadastro", validateSchema(schemaCadastro), cadastro);
userRouter.post("/login", validateSchema(schemaLogin), login);

export default userRouter;