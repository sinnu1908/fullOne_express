
const express=require("express");
const cors=require("cors");
const connection = require("./db");
const { userRoutes } = require("./routes/user.routes");
const { employeeRoutes } = require("./routes/employee.routes");
require('dotenv').config();




const server=express();
server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(employeeRoutes)



server.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log(`server is running at port ${process.env.port}`);
        console.log("db is connected to the server")     
    } catch (error) {  
        res.status(400).json({error})
    }

})