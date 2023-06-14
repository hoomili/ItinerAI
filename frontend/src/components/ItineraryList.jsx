import { useState, useEffect } from "react";
import axios from "axios";

const ItineraryList = ({ userId }) => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/itineraries/${userId}`)
        .then((response) => {
          setItineraries(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const mappedItineraries = itineraries.map(itinerary => (
  //   <ItineraryListItem
  //     key={itinerary.id}
  //     id={itinerary.id}
  //     aiData={itinerary.aiData}
  //     itinerary={itinerary.response_prompt}
  //     city={itinerary.city}
  //     country={itinerary.country}
  //   />
  // ));

  // return (
  //   <ul className="itinerary-list">
  //     {itineraries.length === 0 && (
  //       <h2>
  //         It looks like you don't have any saved itineraries! Click Create
  //         Itinerary to get started!
  //       </h2>
  //     )}
  //     {mappedItineraries}
  //     {aiData && aiData.length > 0 && <ItineraryListItem aiData={aiData} />}
  //   </ul>
  // );
  return (
    <ul className="itinerary-list">
      {itineraries.length === 0 ? (
        <h2>
          It looks like you don't have any saved itineraries! Click Create
          Itinerary to get started!
        </h2>
      ) : (
        itineraries.map((itinerary) => (
          <li key={itinerary.id}>
            {/* Render itinerary details */}
            <h3>
              {itinerary.city}, {itinerary.country}
            </h3>
            {/* <p>{itinerary.description}</p>
            <p>Created by: {itinerary.username}</p> */}
            {/* Render map image */}
            <img src={itinerary.image_url} alt={itinerary.name} />
          </li>
        ))
      )}
    </ul>
  );
};

export default ItineraryList;
