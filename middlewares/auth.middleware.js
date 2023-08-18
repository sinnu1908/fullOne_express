
require("dotenv").config();
const jwt=require("jsonwebtoken");
const { logoutModel } = require("../models/user.model");


const auth=async(req,res,next)=>{

    let token=req.headers.authorization?.split(" ")[1]
    console.log(token)

try {

    if(token){
 
        const bltoken=await logoutModel.findOne({blToken:token});
        console.log(bltoken)
        if(bltoken){
            res.status(400).json({msg:"User is loggedOut, Please Login"})
        }else{

            const decode=jwt.verify(token,process.env.secretKey);

            if(decode){
             
                req.body.userId=decode.user.userId;
                req.body.email=decode.user.email;
                next();

            }else{

                res.status(201).json({msg:"Please Login to access Dashboard"})
            }
        }

    }else{

        res.status(400).json({msg:"User is not authenticated, Please Login"})
    }
    
} catch (error) {
    res.status(400).json({error})
}

}


module.exports={
    auth
}