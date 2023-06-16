import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
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
    return (
      <div className="itinerary-loader--container">
        <h1 className="itinerary-list--loader">Loading your itineraries...</h1>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="itinerary-header">My Trips</h1>
      {itineraries.length === 0 ? (
        <h2 className="itinerary-empty">
          It looks like you don't have any saved itineraries! Click{" "}
          <Link to="/">Create Itinerary</Link> to get started!
        </h2>
      ) : (
        <ul className="itinerary-list">
          {itineraries.map((itinerary) => (
            <div className="itinerary-item--container" key={itinerary.id}>
              <div className="itinerary-item">
                <li>
                  <Link
                    to={`/itinerary/${userId}/${itinerary.id}`}
                    onClick={() => selectItinerary(itinerary)}
                  >
                    <img
                      className="itinerary-item--photo"
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=1080&photo_reference=${itinerary.image_url}&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`}
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
          ))}
        </ul>
      )}
      {selectedItinerary && (
        <ItineraryListItem aiData={selectedItinerary.aiData} />
      )}
    </div>
  );
};

export default ItineraryList;
