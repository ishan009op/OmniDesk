import Notes from '../Models/Notes.Model.js'

export const getNotes=async(req,res)=>{
    try {
       
       
       const filter={userId:req.user.id}

        
    const notes=await Notes.find(filter).sort({createdAt:-1})

    res.json(notes)
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
}

export const PostNotes=async(req,res)=>{

const {title,desc,pinned,tags}=req.body

const notes= await Notes.create({
    title,
    desc,
    pinned,
    tags,
    userId:req.user.id
})

res.json(notes)

}

export const EditNotes=async(req,res)=>{
    const {title,desc,pinned,tags}=req.body

    const notes= await Notes.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{
        title,desc,pinned,tags,userId:req.user.id
    })
res.json(notes)
}

export const DeleteNotes=async(req,res)=>{
   

    const notes= await Notes.findOneAndDelete({_id:req.params.id,userId:req.user.id})
res.json({msg:"deleted",notes})
}
export const pinnedNotes=async(req,res)=>{
    const updates=req.body

    const notes= await Notes.findOneAndUpdate({_id:req.params.id,userId:req.user.id},updates,{new:true})
res.json(notes)
}

export const getSingleNote=async(req,res)=>{
    const notes = await Notes.findOne({_id:req.params.id,userId:req.user.id})
    res.json(notes)
}