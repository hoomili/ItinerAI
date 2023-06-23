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

  const prompt = `Your task is to create a fantastic travel itinerary for your client based on the following information. Your client is planning to visit ${city}, ${country} for ${numDays} days with a daily budget of $${dailyBudget} dollars. They are particularly interested in ${interests}. While the itinerary should cater to the client's interests, it should also introduce them to popular local attractions and landmarks.

  Structure your output in JSON format.

  Put each day in its own object similar to the example below. Include the accommodation as an object that contains a suggested accommodation option in the form of a key-value pair. This should be noted as its own object in your response.
  
  EXAMPLE:
  "itinerary": [
    {Day1: title}, {Day2: title}
  ],
  "accommodation": {
    "title": "Hotel Example"
  }

  Each day should include the following:

  'itinerary_text': This is HTML formatted text that is well-designed and spaced appropriately. It should include the written itinerary you have developed. Make the title to have <h3> tag, and provide suggestions in an ordered list. Please ensure the key landmarks and attractions are bolded in the body of text by using the <strong> </strong> tags.

  'key_locations': an array of objects that contain the title of each key locations suggested in the itinerary. Share them in your response with me in the below example format.

  EXAMPLE:
  "key_locations": [
    {
      "title": "Capilano Suspension Bridge Park"
    }, 
    {
      "title": "Granville Island Public Market"
    }
  ]

  'restaurants': an array of objects that contain all the suggested restaurants in the itinerary per day. Share them in your response with me in the below example format. include at least one restaurant per day

  EXAMPLE:
  "restaurants": [
    {
      "title": "XYZ"
    }, 
    {
      "title": "XYZ"
    }
  ]

  Final result should look like this:
  {
    "itinerary": [
      {
        "itinerary_text",
        "key_locations",
        "restaurants"
      }, 
      {
        "itinerary_text",
        "key_locations",
        "restaurants"
      }
    ],
    "accommodation": {
      "title": "Hotel Example"
    }
  }

  Please ensure that there are no repeated activities, locations, or restaurants in the itinerary, and the text isn't repetitive.

  Remember, the entire response should be in JSON format.`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      messages: [
        { role: "system", content: "You are a helpful travel assistant bot." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 2500,
    });

    console.log(response.data.choices[0].message.content);

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

    const savePhoto = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}%20${country}&inputtype=textquery&fields=photos&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`,
      headers: {}
    })

    for (let i = 0; i < itinerary.length; i++) {
      const element = itinerary[i];
      const dayLocations = [];
      itineraryList.push(element.itinerary_text);
      for (const iterator of element.key_locations) {
        const locationData = await axios(config(iterator.title));
        if (locationData.data.candidates && locationData.data.candidates[0] && !('photos' in locationData.data.candidates[0])) {
          locationData.data.candidates[0].photos = savePhoto.data.candidates[0].photos;
        }
        if (locationData.data.candidates && locationData.data.candidates[0]) {
          dayLocations.push(locationData.data.candidates[0]);
        }
      }
      for (const iterator of element.restaurants) {
        const locationData = await axios(config(iterator.title));
        if (locationData.data.candidates && locationData.data.candidates[0] && !('photos' in locationData.data.candidates[0])) {
          locationData.data.candidates[0].photos = savePhoto.data.candidates[0].photos;
        }
        if (locationData.data.candidates && locationData.data.candidates[0]) {
          dayLocations.push(locationData.data.candidates[0]);
        }
      }
      locationsPerDay.push(dayLocations);
    }
    // console.log('locations for days', locationsPerDay)

    //get the photo for saving the itinerary

    
    console.log(savePhoto);
    const responseData = {
      accommodation,
      city,
      country,
      locationsPerDay,
      stay,
      itineraryList,
      savePhoto: savePhoto.data.candidates[0],
    };
    locationsPerDay.forEach((dayLocations, index) => {
      console.log(`Day ${index + 1}:`);
    
      dayLocations.forEach((location, locationIndex) => {
        console.log(`Location ${locationIndex + 1}:`, location);
      });
    });
    console.log('responseData', responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
