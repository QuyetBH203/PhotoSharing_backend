import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    login_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    location: { type: String },
    description: { type: String },
    occupation: { type: String },
});

export default mongoose.model("User", userSchema);