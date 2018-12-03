const router = require('koa-router')();

const linkApi = require('../api/linkApi');

router.prefix('/link');

router.get('/', linkApi.GET_LINK);

module.exports = router