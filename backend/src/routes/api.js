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

  const prompt = `Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget} dollars. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks.
  
  Return the information in JSON format as an object with the following key value pairs and format.

  'itinerary_text': a string with the entirety of the written itinerary you have developed.

  EXAMPLE:
  "itinerary_text":
  "Day 1: details
  Day 2: details
  Day 3: details"

  'key_locations': an object which contains the following data (title, latitude and longitude). Select at most two of these key locations per day in the itinerary to share in your response with me.

  EXAMPLE:
  "key_locations": [{
    "title": "Capilano Suspension Bridge Park" 
    "latitude": 49.343795, 
    "longitude": -123.117183 
}, 
{
    "title": "Granville Island Public Market" 
    "latitude": 49.270068, 
    "longitude": -123.138456 
}]

  Please provide an accomodation option in the form of a key-value pair.

  EXAMPLE:
  "accomodation": {
    "title": "Hotel Vancouver"
    "latitide": 49.2837,
    "longitude": -123.1211
  }

  DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.

  Your entire response should be in JSON format, nothing else. 

  `;


  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a helpful travel assistant bot."}, {"role": "user", "content": prompt}],
      temperature: 0.2,
      max_tokens: 1000,
    });
    // console.log('response data choices[0].message.content:', response.data.choices[0].message.content);
    // console.log('response ', response);

    // Insert data into the database
    const jsonData = JSON.parse(response.data.choices[0].message.content)
    console.log('jsonData:', jsonData)
    const itineraryText = jsonData.itinerary_text;
    const keyLocations = jsonData.key_locations
    const accomodation = jsonData.accomodation

    console.log('itinerary text:', itineraryText)

    console.log('key locations:', keyLocations)
    console.log('accomodation suggestion:', accomodation)

    // await addItinerary(1, prompt, numDays, interests, dailyBudget, interests, itineraryText);
    // await addMap(itineraryId, `'My trip to' + ${city}`, city, country, image_url);
    // await addPoints(mapId, title, latitude, longitude, description, image_url, rating);

  
    res.json({ message: 'Response complete' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;