const ev = process.env.NODE_ENV

let MYSQL_CONFIG = null

if (ev == 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '_Admin2017',
        port: '3306',
        database: 'myblog'
    }
}

if (ev == 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '_Admin2017',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONFIG
}