const TelegramBot = require('node-telegram-bot-api');
const model =require("./model")
const User= require("./User")
const fs = require("fs")
const delay = require("delay")
// replace the value below with the Telegram token you receive from @BotFather
const token = '6172566880:AAFi0HVpLT8FnhNdqHAMCVXH-H0BjZM4bqY';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
let i=0
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
// Listen for any kind of message. There are different kinds of
// messages.

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   i++
//   // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message',{
  //   "reply_markup": {
  //     "inline_keyboard": [[
        
  //       {
  //         text:"inline",
  //         callback_data:"kkk",
          
  //       }
  //     ]]
  //   }});
//   });
 

const homekey= [["send"],["🔜event maker"], ["🔜match maker"],["🔜....."]]
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
  bot.sendMessage(msg.chat.id,"بگو")
  bot.once("message",(msg)=>{
    bot.sendMessage(msg.chat.id,`زفت که تایید بشه`)
    bot.sendMessage(judge.userId,msg.text,{
      "reply_markup": {
        "inline_keyboard": judgepan
      }})
  })
}
  bot.onText(/\/start/, (msg) => {
    const user={
      "name":`${msg.from.first_name } ${msg.from.last_name}`,
      "username":msg.from.username,
      "userId":msg.from.id,
      "chatId":msg.chat.id,
      "time":String(Date.now())
    }
    ss=User.create(user)
    bot.sendMessage(msg.chat.id, `${ss}`, {
      "reply_markup": {
        "keyboard": homekey
      }
    });
    
  });
  


  bot.on("message",async(msg)=>{
    const judge=await User.getJudge()
    // bot.sendMessage(msg.chat.id,`${judge.userId}`)
    if (msg.text=="send"){
      await send(msg,judge)
    }else if(msg.text=="🔜event maker"||msg.text=="🔜....."||msg.text=="🔜match maker"){
      bot.sendMessage(msg.chat.id,"\n هر ۳۰۰۰ تا عضو یک ویژگی جدید \n ویژگی بعدی : 🔜event maker \n با این ویژگی میتونی ایونت بسازی  ")
    }

  })
  
  bot.on("polling_error", console.log);

  bot.onText(/\/addJudge/, (msg) => {
    User.addJudge(msg.from.id) 
    bot.sendMessage(msg.chat.id, `judge added`, {
      "reply_markup": {
        "keyboard": [["hi", "bye✌🏻"],["/echo hi"],["I'm robot"]]
      }
    });
  });

  bot.addListener("callback_query",(msg)=>{
    // console.log(JSON.stringify(msg));
    if(msg.data=="approved"){
      bot.sendMessage("@fumcrshyb",`${msg.message.text}`)
      bot.sendMessage(msg.from.id,"your message published ✅")
    }else if(msg.data=="notAprove"){
      bot.sendMessage(msg.from.id,"your message not published ❌")
    }else if(msg.data=="ban usser"){

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
    bot.sendMessage("@fumcrshyb",`\n${  Message.loadMessages(i)} \n @fumcrshyb`)
      await delay(5000);
      
  }
    
  }
})