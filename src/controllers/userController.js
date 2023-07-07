import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function novaTransacao(req, res) {
    const { tipo } = req.params;
    try {
        const { valor, descricao } = req.body;
        const usuario = await db.collection("cadastrados").findOne({_id: res.locals.tokenOk.idUsuario});
        await db.collection("transacoes").insertOne({
            idUsuario: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            tipo,
            valor,
            descricao,
            data: dayjs().format('DD/MM')
        })
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function transacoes(req, res) {
    console.log(res.locals.tokenOk);
    try {
        const transacoes = await db.collection("transacoes").find({idUsuario: res.locals.tokenOk.idUsuario}).toArray();
        res.send(transacoes);
    } catch (error) {
        res.status(500).send(error.message);
    }
}