const express = require("express");
const router = express.Router();
const { addItinerary } = require("../db/queries/helpers");


module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id, accommodations, response_prompt, city, country } = req.body;
    console.log('Received request...getting help to add to DB')
    addItinerary(
      user_id, 
      accommodations, 
      response_prompt,
      city,
      country,
      req.body.image_url,
      db // Pass the db object to the addItinerary function
    )
    .then(() => {
      res.status(201).json({ status: 'success', message: 'Itinerary saved successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Itinerary did not save' });
    });
  });

  // router.delete("/:id", (req, res) => {
  //   const { id } = req.params;

  //   deleteItinerary(id, db) // Pass the db object to the deleteItinerary function
  //     .then(() => {
  //       res.status(200).json({ status: 'success', message: 'Itinerary deleted successfully' });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.status(500).json({ status: 'error', message: 'Itinerary not deleted.' });
  //     });
  // });

  return router;
};
