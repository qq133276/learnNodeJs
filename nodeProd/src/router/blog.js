const {SuccessModel, ErrorModel} = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
}
const handleBlogRouter = async (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || '' 
        if (req.query.isadmin) {
            console.log(req.session)
            const loginCheckResult = await loginCheck(req)
            console.log('login-result', loginCheckResult)
            if(loginCheckResult){
                return loginCheckResult
            }
        }
        let resData = await getList(author, keyword)
        return new SuccessModel(resData)
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        let resData = await getDetail(id)
        return new SuccessModel(resData)
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        // req.body.author = 'zhangsan'
        req.body.author = req,session.username
        const blogData = await newBlog(req.body)
        return new SuccessModel(blogData)
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        let id = req.query.id
        let result = await updateBlog(id, req.body)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel()
        }
    }

    if (method === 'POST' && req.path === '/api/blog/delete') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        let id = req.query.id
        let author = req.session.username
        let result = deleteBlog(id, author)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel()
        }
    }

    

}

module.exports = handleBlogRouter
