import express, { Application, Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import chatRouter from "./routes/chatRoutes";
import cors from "cors"

export const app: Application = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/auth",authRouter);
app.use("/chat",chatRouter);