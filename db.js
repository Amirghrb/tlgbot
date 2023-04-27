const db = require('mongoose');

db.connect('mongodb://127.0.0.1:27017/CYB')
  .then(() => console.log('Connected!'));

  module.exports={
    db
  }