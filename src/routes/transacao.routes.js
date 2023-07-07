import { Router } from "express";
import { novaTransacao, transacoes } from "../controllers/userController.js";
import { validateAuth } from "../middleware/validateAuth.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { schemaTransacao } from "../schemas/transacao.schemas.js";

const transacaoRouter = Router();

transacaoRouter.post("/nova-transacao/:tipo", validateAuth, validateSchema(schemaTransacao), novaTransacao);
transacaoRouter.get("/transacoes", validateAuth, transacoes);

export default transacaoRouter;