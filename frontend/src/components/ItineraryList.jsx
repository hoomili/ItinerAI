import { useState, useEffect } from "react";
import axios from "axios";
import ItineraryListItem from "./itinerarylistitem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/ItineraryList.scss";
import { ColorRing } from "react-loader-spinner";

const ItineraryList = ({ userId, selectedItinerary, setSelectedItinerary }) => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const handleItineraryClick = (event, itineraryId) => {
    // Open the itinerary if the click is not on the delete button
    if (!event.target.closest(".delete-button")) {
      const selected = itineraries.find((itinerary) => itinerary.id === itineraryId);
      const aiData = JSON.parse(selected.response_prompt);
      setSelectedItinerary({ ...selected, aiData });
    }
  };

  const handleDeleteItinerary = (itineraryId) => {
    axios
      .delete(`http://localhost:8080/itineraries/${itineraryId}`)
      .then((response) => {
        // Update the list of itineraries after successful deletion
        setItineraries((prevItineraries) =>
          prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
        );
      })
      .catch((error) => console.log(error));
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
    <div className="itinerary-master-container">
      <h1 className="itinerary-header">My Trips</h1>
      {itineraries.length === 0 ? (
        <h2 className="itinerary-empty">
          It looks like you don't have any saved itineraries! Click Create
          Itinerary to get started!
        </h2>
      ) : (
        <ul className="itinerary-list">
          {itineraries.map((itinerary) => (
            <div className="itinerary-item--container" key={itinerary.id}>
              <div className="itinerary-item">
                <li onClick={(event) => handleItineraryClick(event, itinerary.id)}>
                  <div className="itinerary-item--photo-container">
                    <img
                      className="itinerary-item--photo"
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=1080&photo_reference=${itinerary.image_url}&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`}
                      alt={itinerary.name}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteItinerary(itinerary.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
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
        <ItineraryListItem aiData={selectedItinerary.aiData} userId={userId} setSelectedItinerary={setSelectedItinerary}/>
      )}
    </div>
  );
};

export default ItineraryList;
