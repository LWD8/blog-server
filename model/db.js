const mongodb = require('./config')
const Schema = mongodb.Schema
const Promise = require('bluebird')
const Moment = require('moment');

// 文章列表
let artItem = {
  content: String,
  create_at: { type: Date, default: Moment().format('YYYY-MM-DD HH:mm:ss') },
  created_at: { type: Date, default: Moment().format('YYYY-MM-DD HH:mm:ss') },
  descript: String,
  id: Number,
  keyword: String,
  meta: {
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  publish: Number,
  state: { type: Number, default: 1 },
  tag: Array,
  thumb: String,
  title: String,
  type: { type: Number, default:1 },
  update_at: { type: Date, default: Moment().format('YYYY-MM-DD HH:mm:ss') }
}

// 评论列表
let commentItem = {
  agent: String,
  author: {
    email: String,
    name: String
  },
  city: String,
  content: String,
  country: String,
  create_at: { type: Date, default: new Date() },
  id: Number,
  ip: String,
  likes: Number,
  pid: Number,
  post_id: Number,
  range: String,
  state: Number
}

let artSchema = new Schema(artItem)
let commentSchema = new Schema(commentItem)

let artModel = mongodb.model('Article', artSchema, 'article')
let commentModel = mongodb.model('Comment', commentSchema, 'comment')

// 可以使用Promise.all
Promise.promisifyAll(artModel)
Promise.promisifyAll(commentModel)

exports.artApi = artModel
exports.commentApi = commentModel