import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { userRepository } from "../repositories/index.js";

async function getAllUsers(req,res){
    try{
        const users = await userRepository.getAllUsers();
        res.status(HttpStatusCode.OK).send(users);
    }catch(exception){
        res.status(HttpStatusCode.NOT_FOUND).send({message:exception.message});
    }
   
  
}

async function getUserById(req,res){
    debugger
   try{
         const id = req?.params?.id;
         const user = await userRepository.getUserById(id);
         res.status(HttpStatusCode.OK).send(user);
   }catch(exception){
       res.status(HttpStatusCode.NOT_FOUND).send({message:exception.message});
   }
}


export default {getAllUsers,getUserById};