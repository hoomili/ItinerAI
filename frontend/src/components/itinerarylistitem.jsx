import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";
import { ItinerarySaveButton } from "./itinerarySaveButton";

import "../styles/itinerarylistitem.scss";

const ItineraryListItem = (props) => {
  const [map, setMap] = useState(null);
  const itinerary = props.aiData[0].itineraryText;
  const points = props.aiData[0].keyLocations;
  const accomodation = props.aiData[0].accomodation;
  const city = props.aiData[0].city;
  const country = props.aiData[0].country;
  console.log("props, aiData:", props.aiData);

  // const config = {
  //   method: "get",
  //   url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Blue%20Water%20Cafe%20vancouver%20canada&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`,
  //   headers: {},
  //   crossdomain: true
  // };
  // useEffect(() => {
  //   axios(config)
  //     .then(function (response) {
  //       setInfo([response.data]);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  // }, [])

  // get the api key for the map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY,
  });

  // set boundry for the map
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(accomodation);
    for (let i = 0; i < points.length; i++) {
      const element = points[i];
      console.log("each point", element);
      const newCoord = new window.google.maps.LatLng(element.lat, element.lng);
      bounds.extend(newCoord);
    }
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // setting up the points for the map
  const newPoints = points.map((position) => {
    return <MarkerF position={position} label={points.title} />;
  });

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="itineray-list--item">
      <div className="itineray-list--item-description">
        <h1>
          Awesome Trip to {city}, {country}{" "}
        </h1>
        <ItinerarySaveButton aiData={props.aiData} />
        <article>{itinerary}</article>
      </div>
      <GoogleMap
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="itineray-list--item-map"
      >
        <MarkerF
          position={accomodation}
          icon={{
            url: require("./../styles/hotel.png"),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
        {newPoints}
      </GoogleMap>
    </div>
  );
};
export default ItineraryListItem;
