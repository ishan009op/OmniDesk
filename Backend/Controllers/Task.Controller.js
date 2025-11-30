import Task from '../Models/Task.Models.js'

export const getTask=async(req,res)=>{
    try {
        
       const {status,priority}=req.query;
       
       const filter={user:req.user.id}

        if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks=await Task.find({userId:req.user.id})

    res.json(tasks)
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
}

export const PostTask=async(req,res)=>{

   
const {title,desc,status,priority}=req.body

const task= await Task.create({
    title,
    desc,
    status,
    priority,
    userId:req.user.id
})

res.json(task)

}

export const EditTask=async(req,res)=>{
    const {title,desc,status,priority}=req.body

    const task= await Task.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{
        title,desc,status,priority,userId:req.user.id
    },{new:true})
res.json(task)
}
export const CompleteTask=async(req,res)=>{
    const updates=req.body

    const task= await Task.findOneAndUpdate({_id:req.params.id,userId:req.user.id},updates,{new:true})
res.json(task)
}
export const DeleteTask=async(req,res)=>{
   

    const task= await Task.findOneAndDelete({_id:req.params.id,userId:req.user.id})
res.json({msg:"deleted",task})
}


export const getSingleTask=async(req,res)=>{
    const task = await Task.findOne({_id:req.params.id,userId:req.user.id})
    res.json(task)
}