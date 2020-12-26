const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/db')
const connecttion = mysql.createConnection(MYSQL_CONFIG)

connecttion.connect()

exec = (sql) => {
    return new Promise((resolve, reject) => {
        connecttion.query(sql, (err, result) => {
            if (err) {
                resolve(err)
                return
            }
            reject(result)
        })
    })
}

module.exports = {
    exec
}