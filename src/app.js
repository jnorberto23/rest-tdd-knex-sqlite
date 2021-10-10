import express from "express";
import dotenv from 'dotenv';

import router from "./routes/routes.js";


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup());


export default app;



