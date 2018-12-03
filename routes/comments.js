const router = require('koa-router')();
const otherApi = require('../api/othreApi')

router.prefix('/comments');

router.get('/', otherApi.GET_COMMENTS_LIST)
router.post('/add', otherApi.POST_ADD_COMMENT)
router.post('/like', otherApi.POST_LIKE_COMMENT)

module.exports = router