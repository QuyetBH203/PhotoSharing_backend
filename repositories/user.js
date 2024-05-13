import e from 'express';
import User from '../db/userModel.js';
import Exception from '../exceptions/Exception.js';

const getAllUsers = async () => {
   try{
         const users = await User.find().select('_id first_name last_name');
         return users;
   }catch(exception){
       throw new Exception(exception.message);
   }
}

const getUserById = async (id) => {
    try{
        const user = await User.findById({_id:id})
        if(user){
            return user;
        }

    }catch(exception){
        throw new Exception(exception.message);
    }
   
    
}
export default {
    getAllUsers,
    getUserById
}