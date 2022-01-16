const fetch = require('node-fetch');
var fs = require('fs');

// if lastbuilddate.txt exists
if (fs.existsSync('lastbuilddate.txt')) {
    var lastBuildDate = fs.readFileSync('lastBuildDate.txt', 'utf8');

    // convert date to text
    lastBuildDate = new Date(lastBuildDate);
} else {
    var lastBuildDate = new Date();
}

const current_date = new Date();

var FEED = `
<feed>
    <title>Spontaneous Idea of the Day</title>
    <id>https://telepathics.github.io/spontaneity-generator/</id>
    <link rel="self" type="application/atom+xml" href="https://task.jamesg.blog/feed.xml" />
    <link rel="alternate" type="text/html" href="https://telepathics.github.io/spontaneity-generator/rss.xml" />
    <generator>https://github.com/capjamesg/spontaneity-rss</generator>
    <updated>${current_date.toISOString()}</updated>
`;

if (lastBuildDate <= current_date) {
    fetch("https://telepathics.herokuapp.com/db/ideas/random")
    .then(res => res.json())
    .then(data => {
        var idea = data["idea"];
        FEED += `
            <entry>
                <id>https://telepathics.github.io/spontaneity-generator/</id>
                <title>${idea}</title>
                <link rel="alternate" href="https://telepathics.github.io/spontaneity-generator/" />
                <summary>${idea}</summary>
                <content>${idea}</content>
                <author>
                    <name>task.jamesg.blog</name>
                </author>
                <published>${current_date.toISOString()}</published>
                <updated>${current_date.toISOString()}</updated>
            </entry>
        `;
        // save to file
        fs.writeFile('rss.xml', FEED + '</feed>', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.writeFile("last_build.txt", current_date.toDateString(), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
};