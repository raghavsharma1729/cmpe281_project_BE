import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userController from './controller/userController.js';
import tripController from './controller/tripController.js';
import * as dotenv from 'dotenv';
import {
    handleLogs,
    handleErrors,
    handleDbConnection,
    handleRoutes
} from './middleware';
import handleAuthentication from './middleware/handleAuthentication.js';


dotenv.config()

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(handleLogs);
app.use(handleDbConnection);

//routes
app.post("/signup", userController.create);
app.post("/login", userController.login);

//secured routes
app.post("/trips", handleAuthentication, tripController.trips);

app.use(handleRoutes);
app.use(handleErrors);

app.listen(8000, () => {
    console.log("Server running on port 8000")
});
