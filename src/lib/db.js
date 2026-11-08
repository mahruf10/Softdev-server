require('dotenv').config()
const { Pool } = require('pg')

// Neon connection string (.env e DATABASE_URL, sslmode=require shoho)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

module.exports = pool
