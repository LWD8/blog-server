const DB = require('../model/admin');
const WellDB = require('../model/db');
const createToken = require('../utils/createToken');
const Moment = require('moment');
const utils = require('../utils/common')
const qiniuToken = require('../utils/qiniuToken')

const resObj = (code, msg = '请求失败', data = '') => {
  return {
    code,
    msg,
    data
  }
}

// 用户登录
exports.POST_ADMIN_LOGIN = async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  try{
    let doc = await DB.adminApi.findOne({username})
    if(!doc){
      return ctx.body = resObj(1, '没有该账号')
    } else if(doc.password === password) {
      //生成一个新的token,并存到数据库
      let token = createToken(username);
      doc.toekn = token;
      // 储存token
      await new Promise((resolve, reject) => {
        doc.save(err => {
          if(err) {
            ctx.body = resObj(1, '储存token有问题')
            reject(err)
          }
          resolve()
        })
      })
      ctx.body = resObj(0, '登录成功', {
        name: doc.name,
        token,
        create_time: doc.create_time
      })
    } else {
      ctx.body = resObj(1, '密码错误!')
    }
  }catch(error){
    ctx.body = resObj(1)
  }
}

// 增加/编辑文章
exports.POST_ADD_ARTICLE = async (ctx, next) => {
  let data = ctx.request.body
  try{
    let doc = {}
    if (!data.isEdit) {
      doc = await WellDB.artApi.findOne({id: data.id})
    }
    if(doc && !data.isEdit) {
      ctx.body = resObj(1, '文章ID已存在')
      return
    }
    let newdata = Object.assign(data, {
      meta: {
        comments: data.comments,
        likes: data.likes,
        views: data.views
       }
    })
    // newdata.thumb = 'http://wen.liwendi.top/images/35228643975941617.jpg'
    newdata.update_at = Moment().format('YYYY-MM-DD HH:mm:ss')
    newdata.create_at = Moment().format('YYYY-MM-DD HH:mm:ss')
    newdata.descript = utils.beautySub(newdata.content, 100)
    delete newdata.comments
    delete newdata.likes
    delete newdata.views
    if(!data.isEdit) {
      const artData = new WellDB.artApi(newdata)
      await new Promise((resolve, reject) => {
        artData.save(err => {
          if(err) {
            ctx.body = resObj(1, '保存失败')
            reject(err)
          }
          resolve()
        })
      })
    } else {
      const artUp = await WellDB.artApi.updateOne({_id: newdata._id},{$set:newdata})
      ctx.body = resObj(0, '文章保存成功', artUp)
    }
  }catch(err){
    ctx.body = resObj(1)
  }
}

// 创建七牛token
exports.GET_QINIU_TOKEN = async (ctx, next) => {
  try{
    let qdata = {
      domain: 'http://pkh8zhjfc.bkt.clouddn.com/',
      token: qiniuToken()
    }
    ctx.body = resObj(0, '获取七牛token', qdata)
  }catch(err){
    ctx.body = resObj(1, '获取token失败')
  }
}