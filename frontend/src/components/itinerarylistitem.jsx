import { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import "../styles/itinerarylistitem.scss";

const ItineraryListItem = (props) => {
  const [map, setMap] = useState(null);
  const itinerary = props.aiData[0].itineraryText;
  const points = props.aiData[0].locations;
  const breakfast = props.aiData[0].breakfast;
  const lunch = props.aiData[0].lunch;
  const dinner = props.aiData[0].dinner;
  const accommodation = props.aiData[0].stay;
  const city = props.aiData[0].city;
  const country = props.aiData[0].country;
  const [activeMarker, setActiveMarker] = useState(null);
  let id = 0;
  const mapBoundry = points.concat(breakfast, lunch, dinner);
  console.log(mapBoundry);

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

  // setting up the points for the map

  const activities = points.map((position) => {
    id++;
    return (
      <MarkerF
        key={id}
        position={position.geometry.location}
        onClick={() => handleActiveMarker(id)}
        icon={{
          url: require("../styles/sightseeing.png"),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      >
        {activeMarker === id ? (
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
  const breakfastMark = breakfast.map((position) => {
    id++;
    return (
      <MarkerF
        key={id}
        position={position.geometry.location}
        onClick={() => handleActiveMarker(id)}
        icon={{
          url: require("../styles/sightseeing.png"),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      >
        {activeMarker === id ? (
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

  const lunchMark = lunch.map((position) => {
    id++;
    return (
      <MarkerF
        key={id}
        position={position.geometry.location}
        onClick={() => handleActiveMarker(id)}
        icon={{
          url: require("../styles/sightseeing.png"),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      >
        {activeMarker === id ? (
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

  const dinnerMark = dinner.map((position) => {
    id++;
    return (
      <MarkerF
        key={id}
        position={position.geometry.location}
        onClick={() => handleActiveMarker(id)}
        icon={{
          url: require("../styles/sightseeing.png"),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      >
        {activeMarker === id ? (
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

  // set boundry for the map
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(
      accommodation.geometry.location
    );
    for (let i = 0; i < mapBoundry.length; i++) {
      const element = mapBoundry[i].geometry.location;

      const newCoord = new window.google.maps.LatLng(element.lat, element.lng);
      bounds.extend(newCoord);
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
      <div className="itineray-list--item-description">
        <h1>
          Awesome Trip to {city}, {country}{" "}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: itinerary }} />
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
        {breakfastMark}
        {lunchMark}
        {dinnerMark}
      </GoogleMap>
    </div>
  );
};
export default ItineraryListItem;
