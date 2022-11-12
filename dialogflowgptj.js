const express = require("express");
require("actions-on-google")
require('dotenv').config();
const axios = require('axios');
const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();
const fetch = require('node-fetch');

app.get('/', (req,res) => {
  res.send('Welcome to Dialogflow-GPTJ Application!!');
})

app.post("/dialogflow-gptj", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", defaultFallback);
    agent.handleRequest(intentMap);
  
    function welcome(agent) {
      agent.add('Hi, I am GPT-J! I am your virtual personal assistant from Orient Telecoms. How are you doing today?');
  }
  
  async function defaultFallback(agent) {
      const instance = axios.create({
        API_URL: 'https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B',
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      });
    
      // const dialog = [
      //   `The following is a conversation with an AI assistant that can have meaningful conversations with users. The assistant is helpful, empathic, and friendly. Its objective is to make the user feel better by feeling heard. With each response, the AI assisstant prompts the user to continue the conversation in a natural way.

      //   AI: Hello, my name is GPT-J. I am your personal AI assistant from Orient Telecoms. How are you doing today?`,
      // ];
      let query = agent.query;
      console.log('querytext ', query) 
      // dialog.push(`User: ${query}`);
      // dialog.push('AI:');

      try {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B',
        {
          headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(query),
        }
      );
        const botResponse = await response.json();
        // console.log('botResponse: ', botResponse[0].generated_text.substring(botResponse[0].generated_text.indexOf(':') + 1).trim())
        console.log('botResponse: ', botResponse)
        agent.add(botResponse[0].generated_text.substring(botResponse[0].generated_text.indexOf(':') + 1).trim());
      } catch (err) {
        console.log('This is error:', err);
        agent.add('Sorry. Something went wrong. Can you say that again?');
      }
    }
  });

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`))
