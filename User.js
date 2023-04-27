const models = require("./model")

const user = models.userModel


const create =async (userData)=>{
   let find=[] 
   find=await user.find({userId:userData.userId})
   console.log(find.length,typeof (find));
   if(find.length==0){
        await user.collection.insertOne({
           username:userData.username,
           name:userData.name,
           userId:userData.userId,
           chatId:userData.chatId,
           date:userData.date,
           isJudge:false
           
        })
        return "user created"
    }else{
        return "welcome back"
    }
}
const addJudge =async (userId)=>{
   let find=[] 
   find=await user.findOne({userId:userId})
   if( typeof(find)=="object"&& !find.isJudge){
       await user.updateOne({
        userId:userId
        },{isJudge:true})
        return "user created"
    }else{
        return "welcome back"
    }
}
const removeJudge =async (userId)=>{
   let find=[] 
   find=await user.findOne({userId:userId})
   if( typeof(find)=="object"&& !find.isJudge){
       await user.collection.deleteOne({
        userId:userId
        })
        return "user created"
    }else{
        return "welcome back"
    }
}
const getJudge =async (userId)=>{
   let find=[] 
   find=await user.findOne({isJudge:true},{userId:1,_id:0})
   return find
}
const selectRandJudges =async (userId)=>{
   let find=[] 
   find=await user.findOne({userId:userId})
   if( typeof(find)=="object"&& !find.isJudge){
       await user.updateOne({
        userId:userId
        },{isJudge:true})
        return "user created"
    }else{
        return "welcome back"
    }
}

module.exports={
    create,
    addJudge,
    getJudge,
}