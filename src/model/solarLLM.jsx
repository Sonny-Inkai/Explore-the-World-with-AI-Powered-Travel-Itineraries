// solarLLM.js
import OpenAI from "openai";
const OpenAI = require('openai');
const fs = require('fs');

const apiKey = "up_SJ2D1P0KBeKxetWsiOnF2v52SRIAp";
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.upstage.ai/v1/solar'
});

const userInput = process.argv[2]; 
const searchResults = JSON.parse(fs.readFileSync('searchResults.json', 'utf8')); // Read search results from a file

async function getRankedResults(userInput, searchResults) {
  const chatCompletion = await openai.chat.completions.create({
    model: 'solar-1-mini-chat',
    messages: [
      {
        role: 'user',
        content: `Rank the following search results based on user input, just choose 3 hotel,  number of hotel and attraciton equal number of day user input, and just return JSON format: ${userInput}`
      },
      {
        role: 'user',
        content: JSON.stringify(searchResults)
      }
    ],
    stream: false
  });

  return chatCompletion.choices[0].message.content || '';
}

getRankedResults(userInput, searchResults).then(result => {
  // Log the ranked results to a file or console
  fs.writeFileSync('rankedResults.json', result);
  console.log(result);
}).catch(error => {
  console.error('Error:', error);
});