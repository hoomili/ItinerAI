// const db = require("../../index");
const client = require("../../index")

const addItinerary = (
  user_id,
  search_prompt,
  number_of_days,
  interests,
  daily_budget,
  accommodations,
  response_prompt
) => {
  console.log(`Adding Itinerary to user's favourites`);

  const queryString = `
  INSERT INTO ITINERARIES (user_id, search_prompt, number_of_days, interests, daily_budget, accomodations, response_prompt)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  const values = [
    user_id,
    search_prompt,
    number_of_days,
    interests,
    daily_budget,
    accommodations,
    response_prompt,
  ];

  return client
    .query(queryString, values)
    .then(() => {
      console.log(`Itinerary added to user's saved itineraries`);
    })
    .catch((error) => {
      console.log("Error adding itinerary to favourites:", error);
    });
};

const deleteItinerary = (itinerary_id) => {
  console.log(`Deleting Itinerary from user's favourites`);

  const queryString = `
  DELETE FROM ITINERARIES 
  WHERE id = $1;
  `;

  return client
    .query(queryString, [itinerary_id])
    .then(() => {
      console.log(`Itinerary deleted from user's saved itineraries`);
    })
    .catch((error) => {
      console.log("Error deleting itinerary from favourites:", error);
    });
};

// const addMap = (itinerary_id, name, city, country, image_url) => {

//   const queryString = `
//   INSERT INTO MAPS (itinerary_id, name, city, country, image_url)
//   VALUES ($1, $2, $3, $4, $5)
//   `
//   const values = [itinerary_id, name, city, country, image_url]
//   return db
//     .query(queryString, values)
// }
// const addPoints = (map_id, title, latitude, longitude, description, image_url, rating) => {

//   const queryString = `
//   INSERT INTO POINTS(map_id, title, latitude, longitude, description, image_url, rating)
//   VALUES ($1, $2, $3, $4, $5, $6, $7)
//   `
//   const values = [map_id, title, latitude, longitude, description, image_url, rating]
//   return db
//     .query(queryString, values)
// }

module.exports = { addItinerary, deleteItinerary, addMap, addPoints };
