const {exex} = require('../db/mysql')
const handleBlog = (req, res) => {
    if(req.path == '/api/blog/list' && req.methord == 'GET'){
        let {keyword, author} = req.query
        
    }
}