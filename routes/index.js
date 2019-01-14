const router = require('koa-router')()

const Home = require('./home')
const Article = require('./article')
const Link = require('./link')
const Comments = require('./comments')
const Wall = require('./wall')
const Admin = require('./admin')

router.use(Home.routes(), Home.allowedMethods())
router.use(Article.routes(), Article.allowedMethods())
router.use(Link.routes(), Link.allowedMethods())
router.use(Comments.routes(), Comments.allowedMethods())
router.use(Wall.routes(), Wall.allowedMethods())
router.use(Admin.routes(), Admin.allowedMethods())

module.exports = router