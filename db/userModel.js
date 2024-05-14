import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     login_name: { type: String, required: true, unique: true },
//     password: { 
//         type: String,
//         required: true ,
//         validate:{
//             validator: (value) => value.length >7,
//             message: "Password must be at least 8 characters long"
//         }
               
//     },
//     first_name: { type: String,required:true },
//     last_name: { type: String, required: true },
//     location: { type: String, required:true },
//     description: { type: String, required: true},
//     occupation: { type: String, required: true },
// });

// export default mongoose.model("User", userSchema);

export default mongoose.model('User', 
    new mongoose.Schema({
        
        login_name: {type: String, 
            required: true,
            unique: true},
      
        password:{
            type: String,
            required: true,
            validate:{
                validator:(value)=>value.length>7,
                message:"Password must be at least 8 characters long"
            }
        },
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        occupation:{
            type:String,
            required:true
        }
    }
        
))