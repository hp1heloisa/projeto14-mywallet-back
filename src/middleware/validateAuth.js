import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next) {
    let tokenOk;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    try {
        tokenOk = await db.collection("sessao").findOne({token});
        if (!tokenOk) return res.sendStatus(401);
    } catch  (error) {
        res.status(500).send(error.message);
    }
    res.locals.tokenOk = tokenOk;
    next();
}