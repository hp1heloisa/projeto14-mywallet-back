import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function cadastro(req, res) {
    try {
        const { nome, email, senha } = req.body;
        const emailOk = await db.collection("cadastrados").findOne({email});
        if (emailOk) return res.sendStatus(409);
        const hash = bcrypt.hashSync(senha, 10);
        await db.collection("cadastrados").insertOne({nome, email, senha: hash});
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const emailOk = await db.collection("cadastrados").findOne({email});
        if (!emailOk) return res.sendStatus(404);
        const senhaOk = bcrypt.compareSync(senha, emailOk.senha);
        if (!senhaOk) return res.sendStatus(401);
        const token = uuid();
        await db.collection("sessao").insertOne({idUsuario: emailOk._id, token});
        res.status(200).send({nome: emailOk.nome, token});
    } catch (error) {
        res.status(500).send(error.message);
    }
}