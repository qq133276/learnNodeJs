const http = require('http')

const handleServe = require('../app')

const PORT = 8001

const serve = http.createServer(handleServe)

serve.listen(PORT)