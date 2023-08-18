const { employeeModel } = require("../models/employee.model");


const registerEmployee=async(req,res)=>{

    const {firstName,lastName,email,department,salary}=req.body;
    try {

        if(!firstName || !lastName || !email || !department || !salary){

            res.status(202).json({msg:"Please fill all the fields"})
        }else{

            const userAvailable=await employeeModel.findOne({email});

            if(userAvailable){
                res.status(202).json({msg:"Employee already exists"})
            }

            else{

                const newEmployee=await new employeeModel({
                    firstName,
                    lastName,
                    email,
                    department,
                    salary
                })

                await newEmployee.save();

                res.status(201).json({msg:"Employee added Successfully"})


            }
        }

        
    } catch (error) {
       res.status(400).json({error})
    }
}



// GET Employee

const getEmployee=async(req,res)=>{

    try {

        const eData=await employeeModel.find();
        res.status(200).json({data:eData})

    } catch (error) {
        res.status(400).json({error})
    }

}


module.exports={
    registerEmployee,
    getEmployee
}