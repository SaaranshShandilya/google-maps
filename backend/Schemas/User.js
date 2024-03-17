import mongoose from "mongoose";

import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
    name: String ,
    email: String ,
    password:String,
    gender:String,
    lat:String,
    long:String,
})

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});


export const UserModel =  mongoose.model("users",UserSchema)