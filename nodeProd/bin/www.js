const http = require('http')

const serveHandle = require('./../app')

const PORT = 8000

const serve = http.createServer(serveHandle)

serve.listen(PORT)
