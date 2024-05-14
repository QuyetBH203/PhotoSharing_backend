import e from 'express';
import User from '../db/userModel.js';
import Exception from '../exceptions/Exception.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
const login = async ({login_name,password}) => {
    debugger
    const existingUser = await User.findOne({ login_name }).exec()
    if (existingUser) {
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched) {
           //create token
           let token=jwt.sign({
            data: existingUser
           },
           process.env.JWT_SECRET,
           {expiresIn:'10 days'})

           return {
               ...existingUser.toObject(),
               password:'not shown',
               token
           }
        }else{
            throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD)
        }

    }else{
        throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD)
    }
}

const register = async (
    {
        login_name,
        password,
        first_name,
        last_name,
        location,
        description,
        occupation
    
    }
) => {
    debugger
    const existingUser = await User.findOne({login_name}).exec();
    if(!!existingUser){
        throw new Exception(Exception.USER_EXISTS);
    }

    //encrypt password
    const hashedPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS));
    const newUser= await User.create({
        login_name,
        password:hashedPassword,
        first_name,
        last_name,
        location,
        description,
        occupation
    });
    return newUser;
  
}

export default {
    getAllUsers,
    getUserById,
    login,
    register
}