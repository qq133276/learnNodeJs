const {SuccessModel, ErrorModel} = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const handleBlogRouter = async (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || '' 
        let resData = await getList(author, keyword)
        return new SuccessModel(resData)
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        let resData = await getDetail(id)
        return new SuccessModel(resData)
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'zhangsan'
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
        let id = req.query.id
        let author = 'zhangsan'
        let result = deleteBlog(id, author)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel()
        }
    }

    

}

module.exports = handleBlogRouter
