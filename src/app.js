const express = require("express");
const cors = require("cors");

const getSentiment = require('./controllers/sentiment')
const client = require('./services/twitterConnect')
const getTweets = require('./controllers/twitter')

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get('/get-sentiment/:keyword/:limit', async (req, res) => {
  const keyword = req.params.keyword;
  const limit = req.params.limit;
  const tweets = await getTweets(client, keyword, limit); 
  const sentiment = getSentiment(await tweets, keyword);
  res.status(200).send(sentiment);
}) 

PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
