import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

const db = mongoClient.db();


const PORT = 5005;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
