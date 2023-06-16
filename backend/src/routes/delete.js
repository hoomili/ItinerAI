const express = require("express");
const router = express.Router();
const { deleteItinerary } = require("../db/queries/helpers");

module.exports = (db) => {
  router.delete("/:id", (req, res) => {
    const itineraryId = req.params.id;

    deleteItinerary(itineraryId, db)
      .then(() => {
        res.status(200).json({ status: "success", message: "Itinerary deleted successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error deleting itinerary" });
      });
  });

  return router;
};