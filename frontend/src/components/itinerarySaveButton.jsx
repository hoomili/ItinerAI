import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ItinerarySaveButton = function () {
  //post request for saving itinerary
  const handleSave = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/itineraries', {
      //need data here
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faHeart}
        onClick={handleSave}
        style={{ color: 'red' }}
      />
    </div>
  );
}

export default ItinerarySaveButton;
