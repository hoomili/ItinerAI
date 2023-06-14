const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
// const { addItinerary, addMap, addPoints } = require("../db/queries/helpers");

// Set up OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handle POST requests to '/api/completions'
router.post("/completions", async (req, res) => {
  // console.log(req.body);
  const { city, country, numDays, dailyBudget, interests } = req.body;

  const prompt = `Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget} dollars. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks.
  
  Return the information in JSON format as an object with the following key value pairs and format.

  'itinerary_text': a string with the entirety of the written itinerary you have developed.

  EXAMPLE:
  "itinerary_text":
  "Day 1: details
  Day 2: details
  Day 3: details"

  'key_locations': an object which contains the following data (title, lat and lng). Select at most two of these key locations per day in the itinerary to share in your response with me.

  EXAMPLE:
  "key_locations": [{
    "title": "Capilano Suspension Bridge Park" 
    "lat": 49.343795, 
    "lng": -123.117183 
}, 
{
    "title": "Granville Island Public Market" 
    "lat": 49.270068, 
    "lng": -123.138456 
}]

  Please provide an accommodation option in the form of a key-value pair.

  EXAMPLE:
  "accommodation": {
    "title": "Hotel Vancouver"
    "lat": 49.2837,
    "lng": -123.1211
  }

  DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.

  Your entire response should be in JSON format, nothing else. 

  `;

// `Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget} dollars. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks. Your itinerary should also include suggested accommodations for each different city you suggest.
  
// //   Return the information in JSON format as an object with the following key value pairs and format.

// //   'itinerary_text': HTML formatted text that is well-designed and spaced appropriately. It should include the entirety of the written itinerary you have developed.

// //   EXAMPLE:
// //   "itinerary_text":
// //   "Day 1: details
// //   Day 2: details
// //   Day 3: details"

// //   'key_locations': an object which contains the title of key locations suggested in the itinerary. Select at least two key locations per day in the itinerary and share them in your response with me in the below example format.

// //   EXAMPLE:
// //   "key_locations": [{
// //     "title": "Capilano Suspension Bridge Park" 
// // }, 
// // {
// //     "title": "Granville Island Public Market" 
// // }]

// //   'accommodation': an object which contains a suggested accommodation option in the form of a key-value pair. This should be noted as it's own object in your response.

// //   EXAMPLE:
// //   "accommodation": {
// //     "title": "Hotel Vancouver"
// //   }

// //   DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.

// //   Your entire response should be in JSON format, nothing else. 

// //   `;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful travel assistant bot." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 1000,
    });

    const jsonData = JSON.parse(response.data.choices[0].message.content);
    const itineraryText = jsonData.itinerary_text;
    const keyLocations = jsonData.key_locations;
    const accommodation = jsonData.accommodation;
    
    console.log("jsonData:", jsonData);
    console.log("itinerary text:", itineraryText);
    console.log("key locations:", keyLocations);
    console.log("accomodation suggestion:", accommodation);

    const responseData = {
      itineraryText,
      keyLocations,
      accommodation,
      city,
      country,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
