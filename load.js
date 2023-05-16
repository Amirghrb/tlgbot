const message= require("./result.json")

const loadMessages = (id)=>{
 return message.messages[id].text[0]

  }
const Messageslen = ()=>{
    return message.messages.length

//   }
// console.log(Messageslen())?
module.exports={
    loadMessages,
    Messageslen
}