import { useState, useCallback, useEffect, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { ItinerarySaveButton } from "./itinerarySaveButton";
import { AuthContext } from "../providers/AuthProvider";

import "../styles/itinerarylistitem.scss";

const ItineraryListItem = (props) => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [day, setDay] = useState(0);
  const {user} = useContext(AuthContext);
  const { isOpen , setIsOpen } = props

  console.log("userID2", props.userId);

  const { itineraryList, locationsPerDay, city, country } = props.aiData;
  const accommodation = props.aiData.stay;

  console.log(
    "all locations",
    props.aiData.savePhoto.photos[0].photo_reference
  );

  useEffect(() => {
    setDay(0)
  }, [props.aiData])

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
                <h4>{position.name}</h4>
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

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds(
        accommodation.geometry.location
      );
      for (let i = 0; i < locationsPerDay[day].length; i++) {
        const element = locationsPerDay[day][i].geometry.location;
        const newCoord = new window.google.maps.LatLng(
          element.lat,
          element.lng
        );
        bounds.extend(newCoord);
      }
      map.fitBounds(bounds);
      setMap(map);
    },
    []
  );

  useEffect(() => {
    // define a function that calculates the new bounds based on props.aiData
      const bounds = new window.google.maps.LatLngBounds(
        accommodation.geometry.location
      );
      for (let i = 0; i < locationsPerDay[day].length; i++) {
        const element = locationsPerDay[day][i].geometry.location;
        const newCoord = new window.google.maps.LatLng(
          element.lat,
          element.lng
        );
        bounds.extend(newCoord);
      }
      // fit the map to the new bounds
      map && map.fitBounds(bounds);
  }, [props.aiData, day]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    props.setSelectedItinerary(null);
  };

  if (!isLoaded || !isOpen) {
    return null;
  }

  return (
    <div className="itineray-list--item">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div className="itineray-list--item-header">
        {user ? <h1>{user.first_name}'s Trip to {city}, {country}{" "}</h1> : <h1>My Trip to {city}, {country}{" "}</h1>}
        <div className="accommodation">
          <h4>Accommodation: </h4>
          <h3>{accommodation.name}</h3>
          <p>
            <strong>Address:</strong> {accommodation.formatted_address} <br />
            <strong>Rating:</strong> {accommodation.rating}/5 ⭐
          </p>
        </div>
        {itinerary}
        <ItinerarySaveButton aiData={props.aiData} userId={props.userId} />
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
