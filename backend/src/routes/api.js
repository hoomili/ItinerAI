const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// Set up OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handle POST requests to '/api/completions'
router.post('/completions', async (req, res) => {
  console.log(req.body)
  const { city, country, numDays, dailyBudget, interests } = req.body;

  const prompt = `You are acting as a travel agent bot. Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget}. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks. For each day that your client will be spending in ${city}, provide at least one activity and restauraunt to visit (these will be the key locations).
  
  Return the information in JSON format as an object with the following key value pairs.

  'Itinerary text': a string with the entirety of the written itinerary you have developped.
  'Key locations': an object which contains the following data (title, latitude and longitude).

  DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.

  Your entire response should be in JSON format, nothing else. 

  `;


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.2,
    max_tokens: 600,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.2,
  });
  console.log('response:', response.data.choices[0].text)
});

module.exports = router;