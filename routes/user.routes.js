
const express=require("express");
const { registerUser, loginUser, logoutU } = require("../controllers/user.controller");

const userRoutes=express.Router();




userRoutes.post("/signup",registerUser);
userRoutes.post("/signin",loginUser);
userRoutes.post("/logout",logoutU);



module.exports={
    userRoutes
}