const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password: String,
    phone:String,
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}