import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

app.use(router);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
