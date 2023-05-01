import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    incharge:{type:String,required:true,trim:true},
    incharge_email:{type:String,required:true,trim:true},
    phone:{type:Number,required:true,trim:true},
    date_of_visit:{type:Date},
    status:{type:String,required:true},
    comment:{type:String,required:true},
    next_call_back:[{call_back_date : { type : Date,required:false,default:Date.now()},call_back_comment : {type : String,required:false,default:""}}]
})

const leadModel = mongoose.model("ClientList",leadSchema)

export default leadModel