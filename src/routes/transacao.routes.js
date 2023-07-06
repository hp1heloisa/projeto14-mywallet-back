import { Router } from "express";
import { novaTransacao, transacoes } from "../controllers/userController.js";

const transacaoRouter = Router();

transacaoRouter.post("/nova-transacao/:tipo", novaTransacao);
transacaoRouter.get("/transacoes", transacoes);

export default transacaoRouter;