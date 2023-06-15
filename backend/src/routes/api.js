const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { addItinerary, addMap, addPoints } = require("../db/queries/helpers");
const axios = require("axios");

// Set up OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handle POST requests to '/api/completions'
router.post("/completions", async (req, res) => {
  // console.log(req.body);
  const { city, country, numDays, dailyBudget, interests } = req.body;

  const prompt = `Create a fantastic travel itinerary based on the following information. Your client will be taking a trip to ${city}, ${country} for ${numDays} days with a daily budget of ${dailyBudget} dollars. The traveler is interested in ${interests}. Make sure your response takes into consideration the interests of your client, but also suggests other popular attractions and landmarks. Your itinerary should also include suggested accommodations for each different city you suggest.
  
    Return the information in JSON format as an object with the following key value pairs and format.
    Put each day in it's own object similar to the example. include the accommodation as an object which contains a suggested accommodation option in the form of a key-value pair. This should be noted as it's own object in your response.
    EXAMPLE:
    "itinerary": [
      {Day1}, {Day2}
    ],
    "accommodation": {
      "title": "Hotel Vancouver"
    }


    Each day should include the following:
    'itinerary_text': HTML formatted text that is well-designed and spaced appropriately. It should include the entirety of the written itinerary you have developed. make the title to have <h3> tag, and each suggestion explaination in an ordered list. Have each of your key locations and restauraunts to be bold in the HTML.
    
  
  
    'key_locations': an object which contains the title of key locations suggested in the itinerary. Select at least two key locations per day in the itinerary and share them in your response with me in the below example format.
  
    EXAMPLE:
    "key_locations": [{
      "title": "Capilano Suspension Bridge Park" 
  }, 
  'restaurants': an array which contains the suggested restaurants in the itinerary per day. Select at least 2 restaurants per day in the itinerary and share them in your response with me in the below example format.
  
  EXAMPLE:
  "restaurants": [{
    "title": "some restaurants" 
  }, 
  {
    "title": "some restaurants" 
  }]
  

  Final result should look like this
    {
      "itinerary": [
        {
          'itinerary_text',
          "key_locations"
          "restaurants"
        }, 
        {
          'itinerary_text',
          "key_locations"
          "restaurants"
        }
      ],
      "accommodation": {
        "title": "Hotel Vancouver"
      }
    }
  
    DO NOT repeat suggested activities or locations and please make sure the itinerary text is not repetitive in nature.
  
    Your entire response should be in JSON format, nothing else.`;

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
    const itinerary = jsonData.itinerary;
    const accommodation = jsonData.accommodation;


    // console.log("jsonData:", jsonData);
    // console.log("itinerary text:", itinerary);
    // console.log("itinerary text:", itineraryText);
    // console.log("key locations:", keyLocations);
    // console.log("accomodation suggestion:", accommodation);
    // console.log("restaurants suggestion:", itinerary.restaurants);
    const locationsPerDay = [];
    const itineraryList = [];


    const config = (title) => {
      return ({method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(title)}%20${city}%20${country}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`,
      headers: {},})
    };
    const stayData = await axios(config(accommodation.title));
    const stay = stayData.data.candidates[0];

    for (let i = 0; i < itinerary.length; i++) {
      const element = itinerary[i];
      const dayLocations = []
      itineraryList.push(element.itinerary_text)
      for (const iterator of element.key_locations) {
        const locationData = await axios(config(iterator.title))
        dayLocations.push(locationData.data.candidates[0])
      }
      for (const iterator of element.restaurants) {
        const locationData = await axios(config(iterator.title))
        dayLocations.push(locationData.data.candidates[0])
      }
      locationsPerDay.push(dayLocations)
    }
    // console.log('locations for days', locationsPerDay)

    

    const responseData = {
      accommodation,
      city,
      country,
      locationsPerDay,
      stay,
      itineraryList,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
