import dayjs from "dayjs";
import { ObjectId } from "mongodb";
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
    try {
        const transacoes = await db.collection("transacoes").find({idUsuario: res.locals.tokenOk.idUsuario}).sort({$natural:-1}).toArray();
        transacoes.forEach(transacao => {
            transacao.valor = Number(transacao.valor).toFixed(2);
        })
        res.send(transacoes);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deletar(req, res) {
    const { id } = req.body;
    try {
        const del = await db.collection("transacoes").deleteOne({_id: new ObjectId(id)});
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function editaTransacao(req, res) {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    try {
        await db.collection("transacoes").updateOne(
            {_id: new ObjectId(id)},
            {$set: req.body}
        )
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}