import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ItineraryDeleteButton = function () {

  //delete request for deleteting itinerary
  const handleDelete = (event) => {
    event.preventDefault();
    //need data here
    axios.delete('http://localhost:8080/itineraries/:id', {
    
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
        icon={faTrash}
        onClick={handleDelete}
        style={{ color: 'grey' }}
      />
    </div>
  );
}

export default ItineraryDeleteButton;
