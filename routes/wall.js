const router = require('koa-router')();
const wallApi = require('../api/wallApi')

router.prefix('/wall')

router.get('/', wallApi.GET_WALL_LIST)
router.post('/add', wallApi.POST_ADD_WALL)

module.exports = router