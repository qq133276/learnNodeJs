const handleLoginRouter = require('./src/router/login')
const handleBlogRouter = require('./src/router/blog')

const querystring = require('querystring')


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

    const blogData = handleBlogRouter(req, res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    const loginData = handleLoginRouter(req, res)
    if(loginData){
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