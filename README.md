# Twitter-sentiment-API

## Introduction
This is an API that can measure the sentiment on twitter about a certain keyword! 

It takes the last 100 tweets about a certain keyword, and with the use of **Twitter APIv2** and **natural language processing** and measures their sentiment level. 

The sentiment leves are set up into 5 different categories:
- 2: sentiment level over 4, that is very positive
- 1: sentiment level over 1, that is positive
- 0: sentiment level between -1 and 1, that is neutral
- -1: sentiment level less than -1, that is negative
- -2: santiment level less than -4, that is very negative
### Functionality
The server listens for `GET` requests on [http://localhost:(PORT)/get-sentiment/(KEYWORD)/(LIMIT)](http://localhost:6000/get-sentiment/Bethesda/100). You need to specify its `PORT` the application is litening on, `KEYWORD` you want to measure and the `LIMIT`. `LIMIT` is between 10 and 100. After recieving the `GET` request, it measures the sentiment level. 

When it's done, it send back a JSON similar to this:
```
{
    "keyword": "Apples",
    "sentiment": 1,
    "sentimentPrecise": 2.19708102018826,
    "sentimentWords": "The general sentiment on twitter about Apples is positive"
}
```
### Technologies used
This API is running on **Node.js** with **express**.
It interacts with the **Twitter APIv2** with **twitter-api-v2**.
To perform the natural language processing several packages are used:
- **apos-to-lex-form** to remove all characters outside of a-z/A-Z
- **spelling-corrector** to fix spelling mistakes
- **stopword** to remove all stopwords like ex. "but"
- **natural** to:
  - tokenize the message
  - measure the sentiment of the text

## Running the project
First, you need to register at [Twitter Developers](https://developer.twitter.com/en). Then, make a project to obtain the **API key**, **API key secret** and the **bearer token** which you need in order to make use of the **Twitter APIv2**.

### Install the dependancies
```
npm install
``` 
### Creating .env file
You need to create a `.env` file in the `/src` directory

In this file you should include:
- `PORT` - on which the application will run on
- `APIKEY` - Twitter API key 
- `APISECRET` - Twitter API key secret
- `BEARERTOKEN` - Twitter API bearer token 
  
### Start the application 
```
npm start
```
