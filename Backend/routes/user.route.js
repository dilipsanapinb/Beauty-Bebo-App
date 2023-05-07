const express=require("express");
const {UserModel}=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const userRouter=express.Router();
require('dotenv').config()

userRouter.use(express.json());
//GET
userRouter.get("/",async(req,res)=>{
    try {
        const user=await UserModel.find();
        res.send(user);
        console.log("All users data");
    } catch (error) {
        res.send("err:not able to get the data of all cars");
        console.log(error);
    }
})

//POST
userRouter.post("/api/register", (req, res) => {
    let { firstname,lastname, email, password, phone } = req.body;
    
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(400).send({ 'Error': err.message });
            } else {
                let newUser = new UserModel({ firstname,lastname, email, password: hash, phone});
                await newUser.save();
                res.status(201).send({ "msg": "Registration is successfull", "User": newUser })
            }
        });
    } catch (error) {
        res.status(400).send({ 'Error': error.message });
        console.log(error);
    }
});

userRouter.post('/api/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ 'email': email });
    let hashPassword = user.password;
    try {
        bcrypt.compare(password, hashPassword, function (err, result) {
            if (result) {
                var token = jwt.sign({ userId: user._id }, process.env.key);
                res.status(200).send({ 'Message': 'Login successful', 'token': token,"userID":user._id });
            } else {
                res.status(400).send({ 'Message': err });
                console.log(err);
            }
        });
    } catch (error) {
        res.status(404).send({ "Message": error.message });
        console.log(error);
    }
});
module.exports={userRouter}
