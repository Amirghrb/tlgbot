require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const model =require("./model")
const User= require("./User")
const fs = require("fs")
const delay = require("delay")

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN ;
const channel = process.env.channel
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
let i=0
 

const homekey= [["send"],["🔜event maker"], ["🔜match maker"],["🔜....."]]
const commandkey= [["home"]]
const bankey= [["shame on me "]]
const judgepan = [
  [{
    text:"approve",
    callback_data:"approved",
    
  }
],
[{
    text:"notAprove",
    callback_data:"notAprove",
    
  }],
  [
  
  {
    text:"ban user",
    callback_data:"ban user",
    
  }
]
]

const send =async(msg,judge)=>{
  bot.sendMessage(msg.chat.id,"بگو",{
    "reply_markup": {
    "keyboard": commandkey
  }})
    bot.once("message",(msg)=>{
      if (msg.text=="home"){
        bot.sendMessage(msg.chat.id,"اشکال نداره دفعه بعد ",{
          "reply_markup": {
          "keyboard": homekey
        }})
      }else{
      bot.sendMessage(msg.chat.id,`رفت که تایید بشه`,{
      "reply_markup": {
      "keyboard": homekey
    }})
    const message =  `${msg.text}@${msg.chat.id}@${msg.from.username}`   

    bot.sendMessage(judge.userId,message,{
      "reply_markup": {
        "inline_keyboard": judgepan
      }})
    }
  })}


  bot.onText(/\/start/, async(msg) => {
    let user={
      name:`${msg.from.first_name } ${((msg.from.last_name!=undefined)?msg.from.last_name:"")}`,
      username:msg.from.username,
      userId:msg.from.id,
      chatId:msg.chat.id,
      time:String(Date.now())
    }
    let usercount = await User.userCount()
   let ss=`عزیز ${user.name}\n به بات کراش یاب خوش امدید \n برای ارسال پیام خود دکمه send را بزنین و پیام خود را ارسال کنید \n`
    if (usercount==0){
      user["isMainAdmin"]=true
      user["isJudge"]=true
      ss+="\n \n you are main admin now "
      User.create(user)
      bot.sendMessage(msg.chat.id, `${ss}`, {
        "reply_markup": {
          "keyboard": homekey
        }
      });
    }else{
      User.create(user)
      bot.sendMessage(msg.chat.id, `${ss}`, {
        "reply_markup": {
          "keyboard": homekey
        }
      });
    }
    
  });
  


  bot.on("message",async(msg)=>{
    // bot.sendMessage(msg.chat.id,`${judge.userId}`)
    const isBaned = await User.isUserBandById(msg.chat.id)
if(!isBaned){
    if (msg.text=="send"){
      const judge=await User.getJudge()
      await send(msg,judge)
    }else if(msg.text=="🔜event maker"||msg.text=="🔜....."||msg.text=="🔜match maker"){
      bot.sendMessage(msg.chat.id,"\n هر 500 تا عضو یک ویژگی جدید \n ویژگی بعدی : 🔜event maker \n با این ویژگی میتونی ایونت بسازی  ")
    }
  }else{
    bot.sendMessage(msg.chat.id,"you are baned 🗿🗿🗿",{
      "reply_markup":{
     keyboard: bankey
      }
    })
  }
  })
  bot.on("polling_error", console.log);
  bot.onText(/\/addJudge/, (msg) => {
    if(User.isAdminById(msg.chat.id)){
      let userId=msg.text.split(" ")[1]
      User.addJudge(userId) 
      bot.sendMessage(msg.chat.id, `judge added \n ${msg.text.split(" ")[1]}`, {
        "reply_markup": {
          "keyboard": homekey
        }
      });
    }else{
      bot.sendMessage(msg.chat.id, `access error you are not main admin`, {
        "reply_markup": {
          "keyboard": homekey
        }
      });
    }
  });

  bot.addListener("callback_query",async(msg)=>{
    // console.log(JSON.stringify(msg));

    let text=msg.message.text.split("@")
    if(msg.data=="approved"){
      bot.sendMessage(channel,`${text[0]}`)
// bot forward stringify <-> jsonify
      bot.sendMessage(text[1],"your message published ✅")
    }else if(msg.data=="notAprove"){
      bot.sendMessage(text[1],"your message not published ❌")
    }else if(msg.data=="ban user"){
        let  res=await User.banUser(+text[1])
        bot.sendMessage(text[1],"you are baned 🗿")
        bot.sendMessage(msg.from.id,`user ${text[1]} : \n ${res} `)

    }else{
      bot.sendMessage(msg.from.id,"CallBack Error")
    }
    
    // if(msg.)
/**!SECTION
 * {
   "id":"463742798305559407",
   "from":{
      "id":107973534,
      "is_bot":false,
      "first_name":"Amir",
      "username":"hogo500600",
      "language_code":"en"
   },
   "message":{
      "message_id":77,
      "from":{
         "id":6172566880,
         "is_bot":true,
         "first_name":"fumcrshyb",
         "username":"fumcrshybBot"
      },
      "chat":{
         "id":107973534,
         "first_name":"Amir",
         "username":"hogo500600",
         "type":"private"
      },
      "date":1682360205,
      "text":"Received your message",
      "reply_markup":{
         "inline_keyboard":[
            [
               {
                  "text":"inline",
                  "callback_data":"kkk"
               }
            ]
         ]
      }
   },
   "chat_instance":"-7755681333572759561",
   "data":"kkk"
}
 */
  })

bot.onText(/\/loadup/,async(msg)=>{
  const Message = require("./load")
  const len = Message.Messageslen()
  for(let i =200; i<len;i++){
    if(typeof(Message.loadMessages(i))=="string"){
     if(i%5==0)
     await delay(5000);
    bot.sendMessage(channel,`\n${  Message.loadMessages(i)} \n @fumcrshyb`)
      await delay(5000);
      
  }
    
  }
})