import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/saveButton.scss";
import { Checkmark } from "react-checkmark";


const ItinerarySaveButton = function ({ aiData, userId }) {
  console.log("aiData", aiData);
  console.log("userID", userId);
  const user_id = userId;
  const accommodations = aiData.accommodation.title;
  const response_prompt = JSON.stringify(aiData)
  const city = aiData.city;
  const country = aiData.country;
  const locationsPerDay = aiData.locationsPerDay; 
  const [isSaved, setIsSaved] = useState(false); 

  const points = locationsPerDay.flatMap((dayLocations) =>
  dayLocations.map((location) => ({
    title: location.name,
    latitude: location.geometry.location.lat,
    longitude: location.geometry.location.lng,
    description: location.formatted_address,
    image_url: location.photos[0].photo_reference,
    rating: location.rating,
  }))
);

  const handleSave = (event) => {
    console.log("trying to make your post...");
    event.preventDefault();

    const imageUrl = aiData.savePhoto.photos[0].photo_reference;
    

    axios
      .post("http://localhost:8080/itineraries", {
        user_id: user_id,
        accommodations: accommodations,
        response_prompt: response_prompt,
        city: city,
        country: country,
        image_url: imageUrl,
        points: points,
      })
      .then((response) => {
        console.log(response);
        setIsSaved(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="save-button">
      {isSaved ? (
        <>
          <Checkmark size={60} color="#282c34" />
        </>
      ) : (
        <form onSubmit={handleSave}>
          <label>
            Like this itinerary? Click the heart to save it:
          </label>
          <button type="submit">
            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
          </button>
        </form>
      )}
    </div>
  );
};

export { ItinerarySaveButton };
