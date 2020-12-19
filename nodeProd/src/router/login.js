const {loginCheck} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleLoginRouter = async (req, res) => {
    const method = req.method
    if (req.path === '/api/user/login' && req.method === 'POST') {
        let {username, password} = req.body
        let result = await loginCheck(username, password)
        if(result.username) {
            return new SuccessModel()
        }
        return new ErrorModel()
    }
}

module.exports = handleLoginRouter