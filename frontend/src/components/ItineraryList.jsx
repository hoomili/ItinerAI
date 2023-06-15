import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItineraryListItem from "./itinerarylistitem";
import "../styles/ItineraryList.scss";

const ItineraryList = ({ userId }) => {

  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/itineraries/${userId}`)
      .then((response) => {
        setItineraries(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const selectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="itinerary-header">My Trips</h1>
      {itineraries.length === 0 ? (
        <h2 className="itinerary-empty">
          It looks like you don't have any saved itineraries! Click Create Itinerary to get started!
        </h2>
      ) : (
        <ul className="itinerary-list">
          {itineraries.map((itinerary) => (
            <div className="itinerary-item--container" key={itinerary.id}>
              <div className="itinerary-item">
                <li>
                  <Link to={`/itinerary/${userId}/${itinerary.id}`} onClick={() => selectItinerary(itinerary)}>
                    <img className="itinerary-item--photo" src={itinerary.image_url} alt={itinerary.name} />
                  </Link>
                  <div className="itinerary-item--location">
                    <h3>
                      {itinerary.city}, {itinerary.country}
                    </h3>
                  </div>
                </li>
              </div>
            </div>
          ))}
        </ul>
      )}
      {selectedItinerary && <ItineraryListItem aiData={selectedItinerary.aiData} />}
    </div>
  );
};

export default ItineraryList;
