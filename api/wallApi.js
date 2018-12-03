const DB = require('../model/wall');

const resObj = (code, msg = '', data = '') => {
  return {
    code,
    msg,
    data
  }
}

// 获取留言板列表
exports.GET_WALL_LIST = async(ctx, next) => {
  let current_page = parseInt(ctx.query.page)
  let page_size = parseInt(ctx.query.page_size) || 10
  let skipNum = (current_page-1)*page_size
  try {
    const [ wall, total ] = await Promise.all([
      DB.wallApi.find().skip(skipNum).limit(page_size),
      DB.wallApi.countDocuments()
    ])
    ctx.body = resObj(1, '列表数据获取成功', {
      list: wall,
      pagination: {
        total,
        current_page,
        page_size,
        total_page: Math.ceil(total/page_size) || 1
      }
    })
  } catch (error) {
    ctx.body = resObj(0, '列表数据获取失败')
  }
}

// 增加留言
exports.POST_ADD_WALL = async(ctx, next) => {
  try {
    const wallData = new DB.wallApi(ctx.request.body)
    await wallData.save()
    ctx.body = resObj(1, '增加留言成功', wallData)
  } catch (error) {
    ctx.body = resObj(0, '增加留言失败')
  }
}