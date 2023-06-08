const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const {addItinerary, addMap, addPoints} = require('../db/queries/helpers')

// Set up OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handle POST requests to '/api/completions'
router.post('/completions', async (req, res) => {
  console.log(req.body)
  const { city, country, numDays, dailyBudget, interests } = req.body;

  const prompt = `Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget} dollars. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks. For each day that your client will be spending in ${city}, provide at least one activity and restaurant to visit (these will be the key locations).
  
  Return the information in JSON format as an object with the following key value pairs and format.

  'itinerary_text': a string with the entirety of the written itinerary you have developed.

  EXAMPLE:
  "itinerary_text":
  "Day 1: details
  Day 2: details
  Day 3: details"

  'key_locations': an object which contains the following data (title, latitude and longitude). Select at most two of these key locations per day in the itinerary to share in your response with me.

  EXAMPLE:
  "key_locations": {
  "Capilano Suspension Bridge Park": {
    "latitude": 49.343795, 
    "longitude": -123.117183 
}, 

"Granville Island Public Market": {
    "latitude": 49.270068, 
    "longitude": -123.138456 
}},

  DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.

  Your entire response should be in JSON format, nothing else. 

  `;


  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a helpful travel assistant bot."}, {"role": "user", "content": prompt}],
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 1000,
    });
    console.log('response data choices[0] text:', response.data.choices[0].text);
    console.log('response ', response);

    // Insert data into the database
    const itineraryText = response.data.choices[0].text.itinerary_text;
    const keyLocations = response.data.choices[0].text.key_locations; 

    console.log('itinerary text:', itineraryText)
    console.log('key locations:', keyLocations)

    // await addItinerary(city, country, numDays, dailyBudget, interests, itineraryText);
    // const itineraryId = // Retrieve the ID of the inserted itinerary from the database
    // await addMap(itineraryId, name, city, country, image_url);
    // await addPoints(mapId, title, latitude, longitude, description, image_url, rating);

    res.json({ message: 'Response complete' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;