import mongoose from "mongoose";

const TaskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
        
    },
    status:{
        type:String,
        enum:["pending","in progress","completed"],
        default:"pending",
        required:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const TaskModel= mongoose.model('Task',TaskSchema)

export default TaskModel