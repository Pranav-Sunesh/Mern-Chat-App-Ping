import { configDotenv } from "dotenv";

configDotenv();

export const PORT:string = process.env.PORT!;
export const dbString: string = process.env.DB_STRING!;
export const dbName: string = process.env.DB_NAME!;
export const secretKey: string = process.env.SECRET_KEY!;


