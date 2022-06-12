async function getTweets(client, keyword, limit) {
  const result = await client.get("tweets/search/recent", {
    query: `${keyword} lang:en -is:retweet`,
    max_results: limit,
  });
  return result
}

module.exports = getTweets;
