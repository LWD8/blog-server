const router = require('koa-router')();

const otherApi = require('../api/othreApi')

router.prefix('/article');

router.get('/list', otherApi.GET_ARTICLE_LIST)
router.get('/details', otherApi.GET_ARTICLE_DETAILS)
router.get('/like', otherApi.GET_LIKE_ARTICLE)

module.exports = router