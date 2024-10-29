import express, { Application, Request, Response } from "express";
import router from "./routes/authRoutes";
import cors from "cors"

export const app: Application = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/auth",router);