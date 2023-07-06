import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import Joi from "joi";
import { cadastro, login } from "./controllers/authController.js";
import { novaTransacao, transacoes } from "./controllers/userController.js";

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

const mongoClient = new MongoClient(process.env.URL_BASE);

try {
    await mongoClient.connect();
    console.log("MongoDB conectado!")
} catch (error) {
    (error) => console.log(error.message);
}

export const db = mongoClient.db();

//Schemas 
export const schemaCadastro = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(3).required()
});
export const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required()
});
export const schemaTransacao = Joi.object({
    valor: Joi.number().positive().precision(2).required(),
    descricao: Joi.string().required(),
    tipo: Joi.valid("entrada", "saida").required()
})

app.post("/cadastro", cadastro);

app.post("/login", login);

app.post("/nova-transacao/:tipo", novaTransacao);

app.get("/transacoes", transacoes);

const PORT = 5005;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
