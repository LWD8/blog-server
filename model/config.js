'use strict'
const db = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/blog-201811';

db.Promise = global.Promise;
db.connect(DB_URL, {
  useNewUrlParser: true,
  /* other options */
})

// 连接成功
db.connection.once('connected', function() {
  console.log('connected mongodb!')
})

// 连接错误
db.connection.on('error', function() {
  console.log('connection fail!')
})

// 连接断开
db.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected!')
})

module.exports = db