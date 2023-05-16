require('dotenv').config()
const db = require('mongoose');
const database = process.env.DATABASE
db.connect('mongodb://127.0.0.1:27017/'+database)
  .then(() => console.log('Connected!'));

  module.exports={
    db
  }