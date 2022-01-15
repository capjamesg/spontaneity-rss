const http = require('http');
const fetch = require('node-fetch');

const hostname = '127.0.0.1';
const port = 3000;

const lastBuildDate = new Date();

var RSS_FEED = `
<rss version="2.0">
    <channel>
        <title>Challenge of the Day</title>
    </channel>
    <link>https://task.jamesg.blog</link>
    <description>Challenge of the Day. Facts sourced from Spontaneity Generator.</description>
    <generator>spontaneity-rss</generator>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
`;

const server = http.createServer((req, res) => {
  fetch("https://telepathics.herokuapp.com/db/ideas/random")
    .then(res => res.json())
    .then(data => {
        var idea = data["idea"];
        RSS_FEED += `
            <item>
                <title>{idea}</title>
                <link>https://task.jamesg.blog</link>
                <description>${idea}</description>
            </item>
        `;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/rss+xml');
        res.end(RSS_FEED + '</channel></rss>');
    })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
