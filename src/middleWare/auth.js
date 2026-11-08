const jwt = require('jsonwebtoken')
const catchAsync = require('../lib/catchAsync')
const { getRole } = require('../auth/auth.service')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send({ message: 'forbidden-access' })
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: 'forbidden-access' })
    }
    req.decoded = decoded
    next()
  })
}

const requireRole = role =>
  catchAsync(async (req, res, next) => {
    const email = req.decoded?.email
    if (!email || (await getRole(email)) !== role) {
      return res.status(403).send({ message: 'UnAuthorized-access' })
    }
    next()
  })

const verifyAdmin = requireRole('admin')
const verifyAgent = requireRole('agent')

module.exports = { verifyToken, verifyAdmin, verifyAgent }
