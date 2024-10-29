import { app } from "./app";
import { server } from "./utils/socket";
import { PORT } from "./config/envConfig";
import { Database } from "./@types";
import { client, db, users } from "./config/db";


//DB connection 

client.connect()
    .then(() => console.log("Connected to Database"));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));