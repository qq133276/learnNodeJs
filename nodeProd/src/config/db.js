const ev = process.env.NODE_ENV

let MYSQL_CONFIG = null
let REDIS_CONFIG = null

if (ev == 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '_Admin2017',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        prot: 6379,
        host: '127.0.0.1'
    }
}

if (ev == 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '_Admin2017',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        prot: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}