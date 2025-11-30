import BookMark from '../Models/BookMark.Models.js'


export const getBookMark=async(req,res)=>{
    try {
       
       
       const filter={userId:req.user.id}

        
    const bookmark=await BookMark.find(filter).sort({createdAt:-1})

    res.json(bookmark)
    } catch (error) {
        res.status(501).json({msg:error.message})
    }}

    
export const PostBookMark=async(req,res)=>{

const {title,url,category,favorite}=req.body

const bookmark= await BookMark.create({
    title,
    url,
    category,
    favorite,
    userId:req.user.id
})

res.json(bookmark)

}

export const EditBookMark=async(req,res)=>{
    const {title,url,category,favorite}=req.body

    const bookmark= await BookMark.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{
        title,url,category,favorite,userId:req.user.id
    })
res.json(bookmark)
}

export const DeleteBookMark=async(req,res)=>{
   

    const bookmark= await BookMark.findOneAndDelete({_id:req.params.id,userId:req.user.id})
res.json({msg:"deleted",bookmark})
}
export const pinnedBookMark=async(req,res)=>{
    const updates=req.body

    const bookmark= await BookMark.findOneAndUpdate({_id:req.params.id,userId:req.user.id},updates,{new:true})
res.json(bookmark)
}

export const getSingleBookMark=async(req,res)=>{
    const bookmark = await BookMark.findOne({_id:req.params.id,userId:req.user.id})
    res.json(bookmark)}