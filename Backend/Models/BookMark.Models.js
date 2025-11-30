import mongoose from "mongoose";

const BookmarkSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
        
    },
    category:{
        type:String,
        enum:['personal','work','study','entertainment','design','development','finance','social','learning','news','others'],
        default:"personal",
        required:true
    },
    favorite:{
        type:Boolean,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const BookmarkModel= mongoose.model('Bookmark',BookmarkSchema)

export default BookmarkModel