import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";

import "../styles/itinerarylistitem.scss";
const ItineraryListItem = () => {
  const [map, setMap] = useState(null);
  const [info, setInfo] = useState([]);
  

  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Blue%20Water%20Cafe%20vancouver%20canada&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}`,
    headers: {},
  };
  useEffect(() => {
    axios(config)
      .then(function (response) {
        setInfo([response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const center = {
    lat: 49.2756,
    lng: -123.1208,
  };

  const positions = [
    { lat: 49.2761, lng: -123.1228, name: "Blue Water Cafe" },
    { lat: 49.2764, lng: -123.1219, name: "Blue Water Cafe" },
    { lat: 49.277, lng: -123.1227, name: "Blue Water Cafe" },
    { lat: 49.2748, lng: -123.1216, name: "Blue Water Cafe" },
    { lat: 49.2753, lng: -123.1213, name: "Blue Water Cafe" },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY,
  });

  const onLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    for (let index = 0; index < positions.length; index++) {
      const element = positions[index];
      const newCoord = new window.google.maps.LatLng(element.lat, element.lng);
      bounds.extend(newCoord);
    }
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const newPositions = positions.map((position) => {
    return <MarkerF position={position} />;
  });

  // useEffect(() => {
  //   axios.get("http://localhost:8080/")
  //   .then((response) => {
  //     console.log(response)
  //   })
  // })
  // useEffect(() => {
  // })
  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="itineray-list--item">
      <div className="itineray-list--item-description">
        <h1>Trip to Vancouver</h1>
        <article>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          dolorem minus, accusantium itaque nobis odit recusandae voluptas.
          Provident illo quaerat ea est reprehenderit iure, natus, porro
          excepturi ratione vel, totam incidunt! Reprehenderit veritatis libero
          consectetur earum? Esse nesciunt ab, modi itaque consectetur sed ipsam
          aut non fuga nam! Adipisci vel eum aliquid voluptatum in ut saepe sint
          optio! A, non temporibus. Eveniet, perspiciatis quisquam commodi nobis
          aspernatur ratione reiciendis exercitationem! Saepe vitae odio soluta
          minima aperiam in repellat perferendis cupiditate commodi architecto
          cum, laudantium dolorum ullam unde, cumque blanditiis animi pariatur
          mollitia optio ab culpa suscipit delectus dicta. Consectetur quo
          soluta, harum assumenda et temporibus excepturi quidem dolores
          similique laboriosam quasi maxime eligendi dignissimos fuga dolorum
          quia neque explicabo laborum omnis. Officiis quam non numquam,
          veritatis in ea. Modi, sed. Sapiente quisquam sit, rerum deserunt
          exercitationem ducimus ratione nisi ipsam, enim mollitia eligendi eius
          magnam iure itaque tenetur iusto quasi officiis cumque, quod vitae
          officia illo rem ad. Architecto nostrum sunt quas itaque! Id animi
          pariatur laborum, quam distinctio facilis autem cupiditate perferendis
          dicta rerum, soluta nulla praesentium voluptatum magnam fugit
          repudiandae quod eos sint illum fuga doloribus iusto quas placeat!
          Quasi natus numquam nobis quaerat laborum quisquam eos aliquid.
          {/* {info} */}
        </article>
      </div>
      <GoogleMap
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="itineray-list--item-map"
      >
        {newPositions}
      </GoogleMap>
    </div>
  );
};
export default ItineraryListItem;
