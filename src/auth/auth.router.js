const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/jwt', controller.createToken)
router.post('/users', controller.registerUser)
router.get('/user/admin/:email', controller.checkAdmin)
router.get('/user/agent/:email', controller.checkAgent)

module.exports = router
