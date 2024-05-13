import express from "express";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { UserController } from "../controllers/index.js";
const router = express.Router();

router.post('/insert', async (request, response) => {
    response.status(HttpStatusCode.CREATED).send(
        { message: "User inserted successfully!" });
});

//get user by id





router.get('/list', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);





export default router;