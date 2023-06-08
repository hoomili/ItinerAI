const express = require("express");
const router = express.Router();
import { addItinerary, deleteItinerary } from "../db/queries/helpers";



router.post("/itineraries", async (req, res) => {
  const { user_id, search_prompt, number_of_days, interests, daily_budget, accommodations, response_prompt } = req.body;

  addItinerary(user_id, search_prompt, number_of_days, interests, daily_budget, accommodations, response_prompt)
    .then(() => {
      res.status(201).json({ status: 'success', message: 'Itinerary saved successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Itinerary did not save' });
    });
});

router.delete("/itineraries/:id", (req, res) => {
  const { id } = req.params;

  deleteItinerary(id)
    .then(() => {
      res.status(200).json({ status: 'success', message: 'Itinerary deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Itinerary not deleted.' });
    });
});


module.exports = router;
