const mongoose = require("mongoose")
const validator = require("validator")

//https://mongoosejs.com/docs/schematypes.html

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
                type:String,
                required:true,
                unique:[true,"Email Id already Present"],
                validate(value){
                    if(!validator.isEmail(value)){
                        throw new Error("Invalid Email")
                    }
                }
            },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    }  ,
    address:{
        type:String,
        required:true
    }      
        
    
})

//model
const Student = new mongoose.model('Student',StudentSchema)
module.exports=Student;