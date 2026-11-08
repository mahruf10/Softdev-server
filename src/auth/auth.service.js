const jwt = require('jsonwebtoken')
const pool = require('../lib/db')

const getRole = async email => {
  const { rows } = await pool.query('SELECT role FROM users WHERE user_email = $1', [email])
  return rows[0]?.role
}

const createToken = payload =>
  jwt.sign(payload, process.env.SECRET, { expiresIn: '5h' })

// Notun user sobsomoy 'user' hoy. Body er role ke bishshash kora hoy na, na hole keu API diye nijeke admin banate parto.
// Admin/agent banate hole admin dashboard theke ba Neon SQL Editor theke role bodlano hoy.
const createUser = async u => {
  const r = await pool.query(
    `INSERT INTO users (user_name, user_email, user_image, role)
     VALUES ($1,$2,$3,'user')
     ON CONFLICT (user_email) DO NOTHING RETURNING id`,
    [u.userName, u.userEmail, u.image ?? u.userImage]
  )
  if (r.rowCount === 0) return { message: 'user already exists' }
  return { acknowledged: true, insertedId: r.rows[0].id }
}

module.exports = { getRole, createToken, createUser }
