import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { userRepository } from "../repositories/index.js";
import { validationResult } from "express-validator";

async function getAllUsers(req, res) {
    try {
        const users = await userRepository.getAllUsers();
        res.status(HttpStatusCode.OK).send(users);
    } catch (exception) {
        res.status(HttpStatusCode.NOT_FOUND).send({ message: exception.message });
    }


}

async function getUserById(req, res) {
    debugger
    try {
        const id = req?.params?.id;
        const user = await userRepository.getUserById(id);
        res.status(HttpStatusCode.OK).send(user);
    } catch (exception) {
        res.status(HttpStatusCode.NOT_FOUND).send({ message: exception.message });
    }
}

async function login(req, res) {
    debugger
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.array() })
    }

    const { login_name, password } = req.body;
    // let trimmedLoginName = login_name.trim();
    //call repository
    try {
        let existingUser=await userRepository
        .login({ login_name, password })
        res.status(HttpStatusCode.OK).json({
            message: 'login user successfull',
            data: existingUser
        })

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })

    }
}


async function register(req, res) {
    debugger
    const{
        login_name,
        password,
        first_name,
        last_name,
        location,
        description,
        occupation
    }=req.body;

    try{
        const newUser= await userRepository.register({
            login_name,
            password,
            first_name,
            last_name,
            location,
            description,
            occupation
        });
        res.status(HttpStatusCode.CREATED).json({
            message: "User registered successfully",
            data: newUser
        });
        
    }catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        
        });
    }
    
}


export default {
    getAllUsers,
    getUserById,
    login,
    register
};