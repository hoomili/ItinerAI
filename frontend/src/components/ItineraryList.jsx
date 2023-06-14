import { useState, useEffect } from 'react';
import ItineraryListItem from './itinerarylistitem';
import axios from 'axios';

const ItineraryList = ({ userId }) => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/itineraries/${userId}`)
        .then(response => setItineraries(response.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const mappedItineraries = itineraries.map(itinerary => (
    <ItineraryListItem
      key={itinerary.id}
      id={itinerary.id}
      itinerary={itinerary.response_prompt}
      city={itinerary.city}
      country={itinerary.country}
    />
  ));

  return (
    <ul className="itinerary-list">
      {itineraries.length === 0 && (
        <h2>
          It looks like you don't have any saved itineraries! Click Create
          Itinerary to get started!
        </h2>
      )}
      {mappedItineraries}
    </ul>
  );
};

export default ItineraryList;