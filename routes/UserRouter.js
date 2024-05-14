import express from "express";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { UserController } from "../controllers/index.js";
import { body } from 'express-validator';
const router = express.Router();

router.post('/insert', async (request, response) => {
    response.status(HttpStatusCode.CREATED).send(
        { message: "User inserted successfully!" });
});

//get user by id





router.get('/list', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.post('/login',
    body('login_name').notEmpty().withMessage('login_name is required'),
    body('password').isLength({min:8}),
    UserController.login);

router.post('/register', UserController.register);





export default router;