# Spontaneity Generator RSS

This project provides an RSS wrapper around [@telepathics' Spontaneity Generator](https://github.com/telepathics/spontaneity-generator), a
project that generates a random and interesting task for you to do.

To subscribe to the RSS feed, enter the following URL into your feed reader:

    https://task.jamesg.blog/

## Setup

First, install the required dependencies for this project:

    npm install

Next, run the regenerate.js file to create the basic RSS feed file:

    node regenerate.js

Once you have run the regenerate.js script, you are ready to run the web app:

    node app.js

It is recommended that you run a cron script every day to regenerate the RSS feed.

The feed only contains one entry which is replaced whenever the regenerate.js script is run.

## Project Views

This project uses the following view:

- / - The project RSS file.

To subscribe to this project, enter https://task.jamesg.blog into your feed reader. You will receive daily updates from the feed with a new task to try.

## Technology Stack

This project uses Node.js.

## Acknowledgements

This project only provides an RSS wrapper around a web app. Thus, @telepathics' main project deserves the credit for the data you see in the feed.

## Contributors

- capjamesg