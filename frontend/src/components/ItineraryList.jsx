import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ItineraryList.scss";

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
      <h1 className="itinerary-header">My Trips</h1>
      {itineraries.length === 0 ? (
        <h2 className="itinerary-empty">
          It looks like you don't have any saved itineraries! Click Create
          Itinerary to get started!
        </h2>
      ) : (
        itineraries.map((itinerary) => (
          <div className="itinerary-item--container" key={itinerary.id}>
          <div className="itinerary-item">
          <li>
          <Link to={`/itinerary/${itinerary.id}`}>
                  <img
                    className="itinerary-item--photo"
                    src={itinerary.image_url}
                    alt={itinerary.name}
                  />
                </Link>
            <div className="itinerary-item--location">
            <h3>
              {itinerary.city}, {itinerary.country}
            </h3>
            </div>
          </li>
          </div>
          </div>
        ))
      )}
    </ul>
  );
};

export default ItineraryList;
