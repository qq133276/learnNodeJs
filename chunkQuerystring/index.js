const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  res.setHeader("content-type", "application/json")

  const responseData = {
    method,
    url,
    path,
    query
  }

  if (method == 'GET') {
    res.end(JSON.stringify(responseData))
  } else if (method == 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      responseData.postData = postData
      res.end(JSON.stringify(responseData))
    })
  }
})

server.listen(8000)