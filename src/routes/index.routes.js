import { Router } from "express";
import transacaoRouter from "./transacao.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use(userRouter);
router.use(transacaoRouter);

export default router;