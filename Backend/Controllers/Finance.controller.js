import Finance from '../Models/Finance.Models.js'


export const getFinance=async(req,res)=>{
    try{
       const filter={userId:req.user.id}

        
    const finance=await Finance.find(filter).sort({createdAt:-1})

    res.json({msg:"success",count:finance.length,finance})
    } catch (error) {
        res.status(501).json({msg:error.message})
    }}
export const PostFinance=async(req,res)=>{

const {title,amount,category,type}=req.body

const finance= await Finance.create({
    title,
    amount,
    type,
    category,
    userId:req.user.id
})

res.json(finance)

}

export const EditFinance=async(req,res)=>{
    const {title,amount,type,category}=req.body

    const finance= await Finance.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{
        title,amount,type,category,userId:req.user.id
    })
res.json(finance)
}

export const DeleteFinance=async(req,res)=>{
   

    const finance= await Finance.findOneAndDelete({_id:req.params.id,userId:req.user.id})
res.json({msg:"deleted",finance})
}
export const pinnedFinance=async(req,res)=>{
    const updates=req.body

    const finance= await Finance.findOneAndUpdate({_id:req.params.id,userId:req.user.id},updates,{new:true})
res.json(finance)
}

export const getSingleFinance=async(req,res)=>{
    const finance = await Finance.findOne({_id:req.params.id,userId:req.user.id})
    res.json(finance)}