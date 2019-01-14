const router = require('koa-router')({
  prefix: '/admin'
});

const adminApi = require('../api/adminApi');
const checkToken = require('../utils/checkToken');

router.post('/login', adminApi.POST_ADMIN_LOGIN)
router.post('/addarticle', checkToken, adminApi.POST_ADD_ARTICLE)

module.exports = router