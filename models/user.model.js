
const mongoose=require("mongoose");

// User Schema

const userSchema=mongoose.Schema({

    email:{type:String,required:true},
    password:{type:String,required:true},
})


//Logout schema

const logoutSchema=mongoose.Schema({
    blToken:{type:String}
})

//Logout Model

const logoutModel=mongoose.model("logoutUser",logoutSchema)


const userModel=mongoose.model("user",userSchema);

module.exports={
    userModel,
    logoutModel,
}