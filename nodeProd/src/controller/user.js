const {exec} = require('../db/mysql')

const loginCheck = async (username, password) => {
    const sql = `select username, realname from users where username='${username}' and password='${password}';`
    let result = await exec(sql)
    return result[0] || {}
}

module.exports = {
    loginCheck
}