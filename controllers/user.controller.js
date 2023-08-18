
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { userModel, logoutModel } = require("../models/user.model");


//Register User

const registerUser=async(req,res)=>{
    
    const {email,password,confirmPassword}=req.body;

    try {

        if(!email || !password || !confirmPassword){
            res.status(202).json({msg:"Please fill all the fields"})
        }

        else if(password!==confirmPassword){
            res.status(202).json({msg:"Password and Confirm Password must be same"})
        }

        else{

            const userAvailable=await userModel.findOne({email});

            if(userAvailable){
                res.status(202).json({msg:"User already exists, Please Login"})
            }else{

                bcrypt.hash(password,4,async(err,hash)=>{

                    if(hash){

                        const newUser=await new userModel({
                            email,
                            password:hash
                        })

                        await newUser.save();

                        res.status(201).json({msg:"User Registered Successfully"})
                    }else{

                        res.status(408).json({msg:"Something went wrong try after some times"})
                    }
                })
            }


        }

    
    } catch (error) {
        console.log(error)
    }

}


//Login User

const loginUser=async(req,res)=>{

    const {email,password}=req.body;
    try {

        if(!email || !password){
            res.status(202).json({msg:"Please fill all the fields"})
        }
        else {

            const userAvailable=await userModel.findOne({email});

            if(userAvailable){
 
                bcrypt.compare(password, userAvailable.password, function(err, result){
                console.log(result,password,userAvailable.password)

                
                console.log(result)

                if(result){

                    const accessToken=jwt.sign({
                        user:{
                            email,
                            userId:userAvailable._id
                        }
                    },process.env.secretKey,
                    {
                        expiresIn:"21days"
                    })

                    res.status(200).json({msg:"Login Successfull",accessToken})

                }else if(!result){
                    res.status(202).json({msg:"Password is incorrect"})
                }else{
                    res.status(408).json({msg:"Something went wrong try after some times"})
                }
              })

            }else{

                res.status(202).json({msg:"User not found"})
            }
        }

        

        
    } catch (error) {
        console.log(error)
    }
}


const logoutU=async(req,res)=>{
      
    const token=req.headers.authorization?.split(" ")[1];

    try {

        if(token){
          
            const blackToken=await new logoutModel({
                blToken:token
            })

            await blackToken.save();
            res.status(200).json({msg:"User Logout successfull"})
            
        }else{


        }
        
    } catch (error) {
        console.log(error)
    }

}


module.exports={
    registerUser,
    loginUser,
    logoutU
}