const models = require("./model")

const message = models.messageModel


const create =(messageData)=>{
   const find= message.collection.find({messageId:messageData.messageId})
    if(find.lenght>0){
        return 2
    }else{
        user.collection.insertOne({
            username:userData.username,
            name:userData.name,
            userId:userData.userId,
            chatId:userData.chatId,
            date:userData.date,
                
        })
        user.save
    }
}