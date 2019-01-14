const mongodb = require('./config');
const Schema = mongodb.Schema;
const Promise = require('bluebird');
const Moment = require('moment');

let adminItem = {
  name: String,
  username: String,
  password: String,
  token: String,
  create_time: {
    type: Date,
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  }
}

let adminSchema = new Schema(adminItem)
let adminModel = mongodb.model('Admin', adminSchema, 'admin')

Promise.promisifyAll(adminModel)

exports.adminApi = adminModel