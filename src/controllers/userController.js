import dayjs from "dayjs";
import { db, schemaTransacao } from "../app.js";

export async function novaTransacao(req, res) {
    const { tipo } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    const validation = schemaTransacao.validate({...req.body, tipo});
    if (validation.error){
        const erros = validation.error.details.map(erro => erro.message);
        return res.status(422).send(erros);
    }
    try {
        const tokenOk = await db.collection("sessao").findOne({token});
        if (!tokenOk) return res.sendStatus(401);
        const { valor, descricao } = req.body;
        const usuario = await db.collection("cadastrados").findOne({_id: tokenOk.idUsuario});
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
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    try {
        const tokenOk = await db.collection("sessao").findOne({token});
        if (!tokenOk) return res.sendStatus(401);
        const transacoes = await db.collection("transacoes").find({idUsuario: tokenOk.idUsuario}).toArray();
        res.send(transacoes);
    } catch (error) {
        res.status(500).send(error.message);
    }
}