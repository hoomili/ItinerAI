import {React, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";



const ItinerarySaveButton = function ({ aiData }) {
  console.log('aiData', aiData);
  const [imageUrl, setImageUrl] = useState("");
  const user_id = 1;
  const accommodations = aiData[0].accommodation.title
  const response_prompt = aiData[0].itineraryText
  const city = aiData[0].city
  const country = aiData[0].country


  const handleImageChange = (event) => {
    setImageUrl(event.target.value);
  };
  
  //post request for saving itinerary
  const handleSave = (event) => {
    console.log('trying to make your post...')
    event.preventDefault();
  
    axios
      .post("http://localhost:8080/itineraries", {
        user_id: user_id,
        accommodations: accommodations,
        response_prompt: response_prompt,
        city: city,
        country: country,
        image_url: imageUrl,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSave}>
        <label>
          Like this itinerary? Upload a cover photo and click the heart to save it:
          <input 
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "red" }}
          />
        </button>
      </form>
    </div>
  );
};


export { ItinerarySaveButton};

