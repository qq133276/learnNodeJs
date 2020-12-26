const handleLoginRouter = require('./src/router/login')
const handleBlogRouter = require('./src/router/blog')

const querystring = require('querystring')
const { set, get } = require('./src/db/redis')

const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (1000 * 60) * 30 * 60)
    return d.toGMTString()
}

// const SESSION_DATA = {}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}


const serveHandle = async (req, res) => {
    // 设置返回格式
    res.setHeader("Content-type", "application/json")
    const env = process.env.NODE_ENV
    // 获取path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    req.body = await getPostData(req)
    req.cookie = {}
    let cookieStr = req.headers.cookie || '';
    cookieStr.split(';').map(item => {
        if(!item){
            return
        }
        let arr = item.split('=')
        let key = arr[0].trim()
        let val = arr[1].trim()
        req.cookie[key] = val
    })
    // let userId = req.cookie.userid
    // let needSetCookie = false
    // if(userId) {
    //     if(!SESSION_DATA.userId){
    //         SESSION_DATA = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA.userId = {}
    // }
    // req.session = SESSION_DATA.userId

    let userId = req.cookie.userId
    let needSetCookie = false
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    console.log('userId', userId)
    req.sessionId = userId
    let sessionData = await get(req.sessionId)
    console.log('sessonData', sessionData)
    if(sessionData == null) {
        set(req.sessionId, {})
        req.session = {}
    } else {
        req.session = sessionData
    }


    const blogData = await handleBlogRouter(req, res)
    if(blogData){
        if(needSetCookie) {
            console.log('set-cookie -- blogData')
            res.setHeader('Set-Cookie', `userId=${userId}; path=/;httpOnly; expries=${getCookieExpries()}`)
        }
        res.end(JSON.stringify(blogData))
        return
    }
    const loginData = await handleLoginRouter(req, res)
    if(loginData){
        if(needSetCookie) {
            console.log('set-cookie -- loginData')
            res.setHeader('Set-Cookie', `userId=${userId}; path=/;httpOnly; expries=${getCookieExpries()}`)
        }
        res.end(JSON.stringify(loginData))
        return
    }
    res.end(JSON.stringify(
        {
            msg: '404'
        }
    ))
    return
}

module.exports = serveHandle