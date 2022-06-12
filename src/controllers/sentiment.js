const aposToLexForm = require("apos-to-lex-form");
const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = require("natural");
const SpellCorrector = require("spelling-corrector");
const stopword = require("stopword");

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");

/* sentiment will be expressed as:
    1: positive
    0: netural
    -1: negative
*/

function caluclateSentiment(sentimentArray) {
  var sum = 0;
  for (let i = 0; i < sentimentArray.length; i++) {
    sum += sentimentArray[i];
  }
  console.log(`Overall sentiment number: ${sum}` );
  if (sum >= 1) {
    return 1;
  } else if (sum == 0) {
    return -1;
  } else {
    return 0;
  }
}

function generateSentimentJSON(sentimentNumber, keyword) {
  if (sentimentNumber == -1) {
    sentimentWords = `The general sentiment on twitter about #${keyword} is negative`;
  } else if (sentimentNumber == 0) {
    sentimentWords = `The general sentiment on twitter about #${keyword} is neutral`;
  } else {
    sentimentWords = `The general sentiment on twitter about #${keyword} is positive`;
  }

  const JSON = {
    keyword: keyword,
    sentiment: sentimentNumber,
    sentimentWords: sentimentWords,
  };

  return JSON;
}

// tweets is an array of tweets
// TODO customize to the twitter API output
function getSentiment(tweets, keyword) {
  const sentimentArray = [];
  (tweets.data).forEach((tweet) => {
    if (!(tweet.text).trim()) {
      sentimentArray.push(0); // check if tweet is empty, if yes, neutral sentiment
    }

    const lexed = aposToLexForm(tweet.text)
      .toLowerCase()
      .replace(/[^a-zA-Z\s]+/g, ""); // remove all characters outside of a-z/A-Z

    const tokenized = tokenizer.tokenize(lexed);

    const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

    const stopWordsRemoved = stopword.removeStopwords(fixedSpelling);

    const analyzed = analyzer.getSentiment(stopWordsRemoved);
    console.log(tweet.text);
    console.log(stopWordsRemoved);
    console.log(analyzed);
    console.log('----------------------------------------------------');
    sentimentArray.push(analyzed);
  });
  const sentimentNumber = caluclateSentiment(sentimentArray);
  const sentiment = generateSentimentJSON(sentimentNumber, keyword);
  return sentiment;
}

module.exports = getSentiment;
