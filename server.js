const http = require('http');

let app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('');
});

app.listen(8080, '127.0.0.1', () => {
  console.log('Server is running');
});
