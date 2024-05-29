const mongoose=require('mongoose')

const FinishSchema=new mongoose.Schema({
    finishType:String,
    description:String
})
const FinishModel=mongoose.model("finishs", FinishSchema)
module.exports=FinishModel