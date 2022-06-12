const { TwitterApi } = require("twitter-api-v2");

require("dotenv").config();

const client = new TwitterApi(process.env.BEARERTOKEN);

const v2Client = client.v2;

module.exports = v2Client;
