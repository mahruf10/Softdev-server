const catchAsync = require('../lib/catchAsync')
const service = require('./auth.service')

const createToken = catchAsync(async (req, res) => {
  res.send({ token: service.createToken(req.body) })
})

const registerUser = catchAsync(async (req, res) => {
  res.send(await service.createUser(req.body))
})

const checkAdmin = catchAsync(async (req, res) => {
  const role = await service.getRole(req.params.email)
  res.send({ admin: role === 'admin' })
})

const checkAgent = catchAsync(async (req, res) => {
  const role = await service.getRole(req.params.email)
  res.send({ agent: role === 'agent' })
})

module.exports = { createToken, registerUser, checkAdmin, checkAgent }
