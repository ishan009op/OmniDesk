import mongoose from "mongoose";

const NotesSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
        
    },
    pinned:{
        type:Boolean,
        required:true
    },
    tags:{
        type:[String],
        default:[],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const NotesModel= mongoose.model('Notes',NotesSchema)

export default NotesModel