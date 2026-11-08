const router = require('express').Router()
const controller = require('./property.controller')

router.get('/property', controller.getProperties)
router.get('/property/:id', controller.getPropertyById)

module.exports = router
