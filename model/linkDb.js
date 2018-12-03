const mongodb = require('./config')
const Schema = mongodb.Schema
const Promise = require('bluebird')

let linkItem = {
  name: String,
  url: String
}

let linkSchema = new Schema(linkItem)

let linkModal = mongodb.model('Link', linkSchema, 'link')

Promise.promisifyAll(linkModal)

exports.linkApi = linkModal