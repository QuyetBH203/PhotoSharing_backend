import express from "express";
import * as dotenv from 'dotenv';

import cors from "cors";

import { UserRouter, PhotoRouter } from "./routes/index.js";
// const CommentRouter = require("./routes/CommentRouter");
dotenv.config();
import connect from "./db/dbConnect.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use('/users', UserRouter);
app.use('/photos', PhotoRouter);

app.get('/', async (request, response) => {
    response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(process.env.PORT||8080, async (req,res) => {
    await connect();
    console.log("server listening on port 8080");
});