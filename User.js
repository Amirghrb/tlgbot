const models = require("./model")

const user = models.userModel

const create =async (userData)=>{
   let find=[] 
   find=await user.find({userId:userData.userId})
//    console.log(find.length,typeof (find));
   if(find.length==0){
        await user.collection.insertOne({
           username:(userData.username!=undefined?userData.username:""),
           name:userData.name,
           userId:userData.userId,
           chatId:userData.chatId,
           date:userData.date,
           isJudge:(userData.isJudge!=undefined?userData.isJudge:false),
           isMainAdmin: (userData.isMainAdmin != undefined ? userData.isMainAdmin :false),
           isBaned:false
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
const banUser =async (userId)=>{
   let find=[] 
   find=await user.findOne({userId:userId})
//    console.log(userId,typeof find,find,find.length);
   if(typeof(find)=="object"){
       await user.updateOne({
        userId:userId
        },{isBaned:true})
        return "user baned"
    }else{
        return "user not found "
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
   find=await user.find({isJudge:true},{userId:1,_id:0})
   let id = Math.round( Math.random()*1000)%find.length
    console.log("sent to this judge\n",find[id],id);
   return find[id]
}
const isAdminById =async (userId)=>{
   let find=[] 
   find=await user.find({isMainAdmin:true,userId:userId},{userId:1,_id:0})
    if (find.length==0)
        return false
    else
        return true

    }
const isUserBandById =async (userId)=>{
   let find=[] 
   find=await user.find({isBaned:true,userId:userId},{userId:1,_id:0})
    if (find.length==0)
        return false
    else
        return true
}
const getBanedUsers =async ()=>{
   let find=[] 
   find=await user.findAll({isBaned:true,userId:userId},{userId:1,_id:0})
    if (find.length>0)
        return find
    else
        return "no one is baned "
}
const userCount =async ()=>{
   const count=await user.estimatedDocumentCount()
   return count
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
    userCount,
    isAdminById,
    banUser,
    isUserBandById,
    getBanedUsers
    
}