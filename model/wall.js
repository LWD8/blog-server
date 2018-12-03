const mongodb = require('./config');
const Schema = mongodb.Schema;
const Promise = require('bluebird')
const Moment = require('moment')

let wallItem = {
  agent: String,
  city: String,
  content: String,
  country: String,
  create_time: {
    type: Date,
    default: Moment().format('YYYY-MM-DD HH:mm')
  },
  id: Number,
  ip: String,
  name: String,
  range: String,
  state: Number
}

let wallSchema = new Schema(wallItem)

let wallModel = mongodb.model('Wall', wallSchema, 'wall')

Promise.promisifyAll(wallModel)

exports.wallApi = wallModel