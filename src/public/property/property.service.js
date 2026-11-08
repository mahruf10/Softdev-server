const pool = require('../../lib/db')
const { buildWhere } = require('../../lib/queryBuilder')

const mapProperty = r => ({
  _id: r.id,
  title: r.title,
  location: r.location,
  priceRange: { min: Number(r.price_min), max: Number(r.price_max) },
  image: r.image,
  postAt: r.post_at,
  agentName: r.agent_name,
  agentEmail: r.agent_email,
  agentImg: r.agent_img,
  verified: r.verified
})

const getProperties = async ({ email, verified }) => {
  const { clause, params } = buildWhere([
    ['agent_email', email],
    ['verified', verified ? verified === 'true' : undefined]
  ])
  const { rows } = await pool.query(`SELECT * FROM properties ${clause} ORDER BY id DESC`, params)
  return rows.map(mapProperty)
}

const getPropertyById = async id => {
  const { rows } = await pool.query('SELECT * FROM properties WHERE id = $1', [id])
  return rows[0] ? mapProperty(rows[0]) : null
}

module.exports = { getProperties, getPropertyById }
