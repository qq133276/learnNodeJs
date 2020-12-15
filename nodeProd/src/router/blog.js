const {SuccessModel, ErrorModel} = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog
} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || '' 
        let resData = getList(author, keyword)
        return new SuccessModel(resData)
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        return new SuccessModel(getDetail(id))
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        console.log(req.body)
        const blogData = newBlog(req.body)
        console.log(blogData)
        return new SuccessModel(blogData)
    }

    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '这是删除一篇博客'
        }
    }

}

module.exports = handleBlogRouter
