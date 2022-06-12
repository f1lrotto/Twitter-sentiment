const express = require("express");
const cors = require("cors");

const getSentiment = require('./sentiment')

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get('/get-sentiment/:coin', (req, res) => {
  const coin = req.params.coin;
  const tweets = getTweets(coin); // TODO implement
  const sentiment = getSentiment(tweets, coin);
  res.status(200).send(sentiment);
}) 

PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
