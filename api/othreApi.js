const DB = require('../model/db')
const Moment = require('moment')

const reqObj = (code, msg = '', data = '') => {
  return {
    code,
    msg,
    data
  }
}

// 获取文章列表
exports.GET_ARTICLE_LIST = async(ctx, next) => {
  let keyword = new RegExp(ctx.query.keyword, 'i')
  let type = ctx.query.type ? parseInt(ctx.query.type) : ''
  let page = ctx.query.page ? parseInt(ctx.query.page) : 1
  let page_size = ctx.query.page_size ?
                  parseInt(ctx.query.page_size)
                  : 2
  let skipNum = (page_size || page) ? (page-1)*page_size : 0
  let options = {
    type,
    title: keyword
  }
  // 如果类型为空，则查询所有类型
  if (!type) delete options.type
  try{
    const [artData, total] = await Promise.all([
      DB.artApi.find(options).skip(skipNum).limit(page_size),
      DB.artApi.countDocuments(options)
    ])
    ctx.body = reqObj(1, '列表数据获取成功', {
      list: artData,
      pagination: {
        total,
        current_page: page,
        page_size,
        total_page: Math.ceil(total/page_size)
      }
    })
  }catch(error){
    ctx.body = reqObj(0, '列表数据获取失败')
  }
}

// 获取文章详情
exports.GET_ARTICLE_DETAILS = async(ctx, next) => {
  let _id = ctx.query.id
  try{
    const artDefails = await DB.artApi.findOne({_id})
    // 阅读数
    artDefails.meta.views++
    await artDefails.save()
    ctx.body = reqObj(1, '列表数据获取成功', artDefails)
  }catch(err){
    ctx.body = reqObj(0, '列表数据获取失败')
  }
}

// 喜欢文章
exports.GET_LIKE_ARTICLE = async(ctx, next) => {
  let _id = ctx.query.id
  try{
    const artDefails = await DB.artApi.findOne({_id})
    artDefails.meta.likes++
    await  artDefails.save()
    ctx.body = reqObj(1, '喜欢文章成功', '')
  }catch(err){
    ctx.body = reqObj(0, '喜欢文章失败')
  }
}

// 删除文章
exports.DELETE_ARTICLE = async (ctx, next) => {
  let { id } = ctx.request.body
  try{
    console.log(id, 'id')
    let data = await DB.artApi.remove({_id: id})
    console.log(data, 'data')
    ctx.body = reqObj(1, '删除文章成功',data)
  }catch(err) {
    ctx.body = reqObj(0, '删除文章失败')
  }
}

// 增加评论
exports.POST_ADD_COMMENT = async(ctx, next) => {
  let agent = ctx.request.header['user-agent']
  let ip = ctx.request.header.origin
  let country = ctx.request.header['accept-language']
  let pid = ctx.request.body.pid
  let post_id = ctx.request.body.post_id
  let content = ctx.request.body.content
  let author = ctx.request.body.author
  try{
    let data = {
      agent,
      author,
      city: '广州',
      content,
      country,
      create_at: Moment().format('YYYY-MM-DD HH:mm'),
      id: Date.parse(new Date()),
      ip,
      likes: 0,
      pid,
      post_id,
      range: '123123123,4564684165',
      state: 1
    }
    let comment = new DB.commentApi(data)
    await comment.save()
    const artDefails = await DB.artApi.findOne({id: post_id})
    artDefails.meta.comments++
    await  artDefails.save()
    ctx.body = reqObj(1, '增加评论成功', comment)
  }catch(error){
    ctx.body = reqObj(0, '增加评论失败')
  }
}

// 获取评论列表
exports.GET_COMMENTS_LIST = async(ctx, next) => {
  let sort = ctx.query.sort
  let page = parseInt(ctx.query.page)
  let page_size = parseInt(ctx.query.page_size)
  let post_id = ctx.query.post_id
  let skipNum = (page-1)*page_size
  try{
    const [ comments, total ] = await Promise.all([
      DB.commentApi.find({post_id}).skip(skipNum).limit(page_size),
      DB.commentApi.countDocuments({post_id})
    ])
    ctx.body = reqObj(1, '列表数据获取成功', {
      data: comments,
      pagination: {
        total,
        page,
        page_size,
        total_page: Math.ceil(total/page_size) || 1
      }
    })
  }catch(error){
    ctx.body = reqObj(0, '列表数据获取失败')
  }
}

// 点赞评论
exports.POST_LIKE_COMMENT = async(ctx, next) => {
  let _id = ctx.request.body._id
  try {
    const comment = await DB.commentApi.findOne({_id})
    comment.likes++
    await comment.save();
    ctx.body = reqObj(1, '点赞成功', comment)
  } catch (error) {
    ctx.body = reqObj(0, '点赞失败')
  }
}
