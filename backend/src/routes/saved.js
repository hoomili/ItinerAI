const express = require("express");
const router = express.Router();
const { addItinerary } = require("../db/queries/helpers");



router.post("/", (req, res) => {
  const { user_id, accommodations, response_prompt, city, country, image_url } = req.body;
  console.log('Received request...getting help to add to DB');
  addItinerary(
    user_id, 
    accommodations, 
    response_prompt,
    city,
    country,
    image_url
  )
    .then(() => {
      res.status(201).json({ status: 'success', message: 'Itinerary saved successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Itinerary did not save' });
    });
});

// router.delete("/itineraries/:id", (req, res) => {
//   const { id } = req.params;

//   deleteItinerary(id)
//     .then(() => {
//       res.status(200).json({ status: 'success', message: 'Itinerary deleted successfully' });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ status: 'error', message: 'Itinerary not deleted.' });
//     });
// });


module.exports = router;

