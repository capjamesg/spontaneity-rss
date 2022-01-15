const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // open app.xml file
    fs.readFile('rss.xml', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found');
            res.end();
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/rss+xml');
        res.end(data);
    })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
