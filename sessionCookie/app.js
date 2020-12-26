const querystring = require('querystring')
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.methord !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] != 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

        let blogData = handleBlog(req, res)
    })
}

const SESSION_DATA = {}
const handleServe = async (req, res) => {
    req.path = req.url.split('?')[0]
    req.query = querystring.parse(req.url.split('?')[1])
    req.bordy = await getPostData(req)
    
    req.cookie = {}
    let cookieStr = req.headers.cookie;
    cookieStr.split(';').map(item => {
        if(!item){
            return
        }
        let arr = item.split('=')
        let key = arr[0].trim()
        let val = arr[1].trim()
        req.cookie[key] = val
    })
}

module.exports = handleServe