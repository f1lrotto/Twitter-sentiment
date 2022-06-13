async function getTweets(client, keyword, limit) {
  const result = await client.get("tweets/search/recent", {
    query: `${keyword} OR #${keyword} lang:en -is:retweet -is:reply -is:quote -has:mentions`,
    max_results: limit,
  });
  return result
}

module.exports = getTweets;
