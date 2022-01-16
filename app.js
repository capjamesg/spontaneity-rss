const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 3009;

const server = http.createServer((req, res) => {
    var request_path = req.url;

    if (request_path == '/') {
        // serve index.html
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('404 Not Found');
                res.end();
            };
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else if (request_path == '/feed.xml') {
        // open app.xml file
        fs.readFile('rss.xml', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('404 Not Found');
                res.end();
            };
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/atom+xml');
            res.end(data);
        })
    } else {
        res.statusCode == 302;
        res.setHeader('Location', 'https://telepathics.github.io/spontaneity-generator/');
        res.end();
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
