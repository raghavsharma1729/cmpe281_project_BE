import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { registerPerson, userLogin } from './controller/index.js';
import * as dotenv from 'dotenv';
import {
    handleLogs,
    handleErrors,
    handleDbConnection,
    handleRoutes
} from './middleware';


dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(handleLogs);
app.use(handleDbConnection);


app.post("/signup", registerPerson);

app.post("/login", userLogin);

app.use(handleRoutes);
app.use(handleErrors);

app.listen(8000, () => {
    console.log("Server running on port 8000")
});
