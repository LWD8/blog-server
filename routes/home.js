const router = require('koa-router')()
const adminApi =  require('../api/adminApi')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
}).get('/qiniuToken', adminApi.GET_QINIU_TOKEN)

module.exports = router
