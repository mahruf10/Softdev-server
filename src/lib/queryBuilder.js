// [column, value] list theke WHERE clause banay. Value na thakle oi filter skip hoy.
// Column name gulo code theke ashe (user input theke na), value gulo $1,$2.. param.
const buildWhere = conditions => {
  const active = conditions.filter(([, v]) => v !== undefined && v !== null && v !== '')
  return {
    clause: active.length
      ? 'WHERE ' + active.map(([col], i) => `${col} = $${i + 1}`).join(' AND ')
      : '',
    params: active.map(([, v]) => v)
  }
}

module.exports = { buildWhere }
