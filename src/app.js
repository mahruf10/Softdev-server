require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRouter = require('./auth/auth.router')
const publicPropertyRouter = require('./public/property/property.router')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('jayga jomi lagbe naki?')
})

// ---- shobar jonno ----
app.use(authRouter)
app.use(publicPropertyRouter)

// central error handler: catchAsync theke ashe error ekhane
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ message: err.message })
})

module.exports = app
