const DB = require('../model/linkDb');

const resObj = (code, msg = '', data = '') => {
  return {
    code,
    msg,
    data
  }
}

// 获取友情信息
exports.GET_LINK = async(ctx, next) => {
  try{
    const linkData = await DB.linkApi.find()
    ctx.body = resObj(1, '列表数据获取成功', linkData)
  }catch(error){
    ctx.body = resObj(0, '列表数据获取失败')
  }
}