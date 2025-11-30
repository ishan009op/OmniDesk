import mongoose from "mongoose";

const FinanceSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
type:Number,
required:true
    }
    ,
    type:{
        type:String,
        enum:["income","expense"],
        default:"income",
        required:true
        
    },
    category:{
        type:String,
        enum:['personal','work','study','entertainment','food','design','development','finance','social','learning','news','others'],
        default:"personal",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const FinanceModel= mongoose.model('Finance',FinanceSchema)

export default FinanceModel