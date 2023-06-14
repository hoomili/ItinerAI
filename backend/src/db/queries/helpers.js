const db = require('../../index')
const query = require('express')
// const client = require("../../index")

const addItinerary = (
  user_id,
  accommodations,
  response_prompt,
  city,
  country,
  image_url,
  db
) => {
  console.log(`Adding Itinerary to user's favourites`);

  const queryString = `
    INSERT INTO ITINERARIES (user_id, accommodations, response_prompt, city, country, image_url)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const values = [
    user_id,
    accommodations,
    response_prompt,
    city,
    country,
    image_url
  ];

  return db
    .connect()
    .then((client) => {
      return client.query(queryString, values)
        .then(() => {
          console.log(`Itinerary added to user's saved itineraries`);
          client.release(); // Release the client back to the pool
        })
        .catch((error) => {
          console.log("Error adding itinerary to favourites:", error);
          client.release(); // Release the client back to the pool
          throw error; // Propagate the error to the outer catch block
        });
    })
    .catch((error) => {
      console.log("Error acquiring client:", error);
      throw error; // Propagate the error to the outer catch block
    });
};
// const deleteItinerary = (itinerary_id) => {
//   console.log(`Deleting Itinerary from user's favourites`);

//   const queryString = `
//   DELETE FROM ITINERARIES 
//   WHERE id = $1;
//   `;

//   return db
//     .query(queryString, [itinerary_id])
//     .then(() => {
//       console.log(`Itinerary deleted from user's saved itineraries`);
//     })
//     .catch((error) => {
//       console.log("Error deleting itinerary from favourites:", error);
//     });
// };

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

module.exports = { addItinerary };
