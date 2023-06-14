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
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
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
      return client
        .query(queryString, values)
        .then((result) => {
          const itinerary_id = result.rows[0].id; // Access the itinerary_id from the result
          console.log(`Itinerary added to user's saved itineraries with id ${itinerary_id}`);
          client.release(); // Release the client back to the pool
          return itinerary_id; // Return the itinerary_id
        })
        .catch((error) => {
          console.log("Error adding itinerary to favourites:", error);
          client.release(); // Release the client back to the pool
          throw error;
        });
    })
    .catch((error) => {
      console.log("Error acquiring client:", error);
      throw error;
    });
};


const addPoints = (itinerary_id, title, latitude, longitude, description, image_url, rating, db) => {
  const queryString = `
  INSERT INTO POINTS (itinerary_id, title, latitude, longitude, description, image_url, rating)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const values = [itinerary_id, title, latitude, longitude, description, image_url, rating];
  
  return db
  .query(queryString, values)
  .then(() => {
    console.log(`Point added to itinerary with id ${itinerary_id}`);
  })
  .catch((error) => {
    console.log("Error adding point to itinerary:", error);
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
module.exports = { addItinerary, addPoints };
