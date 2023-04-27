const instdb =require("./db");
const db=instdb.db;
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const message = new Schema({
  id:Number,  
  author: Number,
  body: String,
  date: Date
});
const messageModel=db.model("message",message)

const user = new Schema({
    name:String,
    userId: Number,
    chatId: Number,
    userName: String,
    date: Date,
    isJudge:Boolean
});
const userModel =db.model("user",user)

module.exports={
    messageModel,
    userModel
  }