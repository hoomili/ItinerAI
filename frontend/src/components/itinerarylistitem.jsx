import { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { ItinerarySaveButton } from "./itinerarySaveButton";

import "../styles/itinerarylistitem.scss";

const ItineraryListItem = (props) => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [day, setDay] = useState(0);

  const { itineraryList, locationsPerDay, city, country } = props.aiData[0];
  const accommodation = props.aiData[0].stay;



  console.log("all locations", locationsPerDay);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // get the api key for the map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY,
  });

  // setting up the locationsPerDay for the map

  const activities = locationsPerDay[day].map((position, index) => {
    return (
      <MarkerF
        key={index}
        position={position.geometry.location}
        onClick={() => handleActiveMarker(index)}
      >
        {activeMarker === index ? (
          <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
            <div className="itineray-list--item-map-infoWindow">
              <div>
                <h3>{position.name}</h3>
                <p>
                  <strong>Address:</strong> {position.formatted_address}
                  <br />
                  <strong>Rating:</strong> {position.rating}/5 ⭐
                </p>
              </div>
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&maxheight=120&photo_reference=${position.photos[0].photo_reference}&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`}
                alt={position.name}
              />
            </div>
          </InfoWindowF>
        ) : null}
      </MarkerF>
    );
  });

  const itinerary = itineraryList.map((item, index) => {
    return (
      <div className="itineray-list--item-description">
        <section dangerouslySetInnerHTML={{ __html: item }} />
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            type="button"
            onClick={() => setDay(index)}
          >
            Show locations of the day on the map
          </button>
        </div>
      </div>
    );
  });

  // set boundry for the map
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(
      accommodation.geometry.location
    );
    for (let i = 0; i < locationsPerDay.length; i++) {
      for (let j = 0; j < locationsPerDay[i].length; j++) {
        const element = locationsPerDay[i][j].geometry.location;
        const newCoord = new window.google.maps.LatLng(element.lat, element.lng);
        bounds.extend(newCoord);
      }

    }
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="itineray-list--item">
      <div className="itineray-list--item-header">
        <h1>
          Awesome Trip to {city}, {country}{" "}
        </h1>
        <div className="accommodation">
          <h4>Accommodation: </h4>
          <h3>{accommodation.name}</h3>
          <p>
            <strong>Address:</strong> {accommodation.formatted_address} <br />
            <strong>Rating:</strong> {accommodation.rating}/5 ⭐
          </p>
        </div>
        {itinerary}
        <ItinerarySaveButton aiData={props.aiData} />
      </div>
      <GoogleMap
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="itineray-list--item-map"
      >
        <MarkerF
          position={accommodation.geometry.location}
          onClick={() => handleActiveMarker(100)}
          icon={{
            url: require("./../styles/hotel.png"),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        >
          {activeMarker === 100 ? (
            <InfoWindowF
              options={{
                pane: "mapPane",
                maxWidth: "350",
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="itineray-list--item-map-infoWindow">
                <div>
                  <h3>{accommodation.name}</h3>
                  <p>
                    <strong>Address:</strong> {accommodation.formatted_address}{" "}
                    <br />
                    <strong>Rating:</strong> {accommodation.rating}/5 ⭐
                  </p>
                </div>
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&maxheight=120&photo_reference=${accommodation.photos[0].photo_reference}&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`}
                  alt={accommodation.name}
                />
              </div>
            </InfoWindowF>
          ) : null}
        </MarkerF>
        {activities}
      </GoogleMap>
    </div>
  );
};
export default ItineraryListItem;
