const handleLoginRouter = (req, res) => {
    const method = req.method
    if (req.path === '/api/user/login' && req.method === 'POST') {
        return {
            msg: '用户登陆'
        }
    }
}

module.exports = handleLoginRouter