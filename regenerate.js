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
    <link>https://telepathics.github.io/spontaneity-generator/</link>
    <description>Spontaneous Idea of the Day. Facts sourced from Spontaneity Generator.</description>
    <generator>https://github.com/capjamesg/spontaneity-rss</generator>
    <lastBuildDate>${current_date.toISOString()}</lastBuildDate>
`;

if (lastBuildDate <= current_date) {
    fetch("https://telepathics.herokuapp.com/db/ideas/random")
    .then(res => res.json())
    .then(data => {
        var idea = data["idea"];
        FEED += `
            <entry>
                <id>${idea}</id>
                <title>${idea}</title>
                <link rel="text/html">https://telepathics.github.io/spontaneity-generator/</link>
                <content>${idea}</content>
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