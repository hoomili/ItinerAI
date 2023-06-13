const db = require("../../index");

const addItinerary = (user_id, search_prompt, number_of_days, interests, daily_budget, accommodations, response_prompt) => {
  const queryString = `
  INSERT INTO ITINERARIES (user_id, search_prompt, number_of_days, interests, daily_budget, accomodations, response_prompt)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `

  const values = [user_id, search_prompt, number_of_days, interests, daily_budget, accommodations, response_prompt];
  return db
    .query(queryString, values)
};

const addMap = (itinerary_id, name, city, country, image_url) => {

  const queryString = `
  INSERT INTO MAPS (itinerary_id, name, city, country, image_url)
  VALUES ($1, $2, $3, $4, $5)
  `
  const values = [itinerary_id, name, city, country, image_url]
  return db
    .query(queryString, values)
}
const addPoints = (map_id, title, latitude, longitude, description, image_url, rating) => {

  const queryString = `
  INSERT INTO POINTS(map_id, title, latitude, longitude, description, image_url, rating)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `
  const values = [map_id, title, latitude, longitude, description, image_url, rating]
  return db
    .query(queryString, values)
}



module.exports = {addItinerary, addMap, addPoints}

