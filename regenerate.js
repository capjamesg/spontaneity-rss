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

var RSS_FEED = `
<rss version="2.0">
    <channel>
        <title>Challenge of the Day</title>
    </channel>
    <link>https://task.jamesg.blog</link>
    <description>Challenge of the Day. Facts sourced from Spontaneity Generator.</description>
    <generator>spontaneity-rss</generator>
    <lastBuildDate>${current_date.toISOString()}</lastBuildDate>
`;

if (lastBuildDate <= current_date) {
    fetch("https://telepathics.herokuapp.com/db/ideas/random")
    .then(res => res.json())
    .then(data => {
        var idea = data["idea"];
        RSS_FEED += `
            <item>
                <title>${idea}</title>
                <link>https://task.jamesg.blog</link>
                <description>${idea}</description>
            </item>
        `;
        // save to file
        fs.writeFile('rss.xml', RSS_FEED + '</channel></rss>', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.writeFile("last_build.txt", current_date.toDateString(), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
};