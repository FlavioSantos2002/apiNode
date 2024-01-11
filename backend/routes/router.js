const router = require('express').Router()


//rotas dos serviços
const servicesRouter = require('./services')
router.use('/', servicesRouter)

const partyRouter = require('./party')
router.use('/', partyRouter)

module.exports = router