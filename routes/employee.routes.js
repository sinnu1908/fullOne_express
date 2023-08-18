

const express=require("express");
const { registerEmployee, getEmployee } = require("../controllers/employee.controler");
const { auth } = require("../middlewares/auth.middleware");

const employeeRoutes=express.Router();


employeeRoutes.post("/employees",registerEmployee);
employeeRoutes.get("/dashboard",auth,getEmployee)


module.exports={
    employeeRoutes,
}