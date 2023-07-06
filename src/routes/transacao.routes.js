import { Router } from "express";
import { novaTransacao, transacoes } from "../controllers/userController.js";

const transacaoRouter = Router();

transacaoRouter.app.post("/nova-transacao/:tipo", novaTransacao);
transacaoRouter.app.get("/transacoes", transacoes);

export default transacaoRouter;