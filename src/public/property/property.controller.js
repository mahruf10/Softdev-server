const catchAsync = require('../../lib/catchAsync')
const service = require('./property.service')

const getProperties = catchAsync(async (req, res) => {
  res.send(await service.getProperties(req.query))
})

const getPropertyById = catchAsync(async (req, res) => {
  res.send(await service.getPropertyById(req.params.id))
})

module.exports = { getProperties, getPropertyById }
