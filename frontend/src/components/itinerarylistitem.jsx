import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from 'axios'

import "../styles/itinerarylistitem.scss";
const ItineraryListItem = () => {
  const [points, setPoints] = useState([])


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY,
  });


  if (!isLoaded) {
    return <div>loading...</div>;
  }
  return (
    <div className="itineray-list--item">
      <div className="itineray-list--item-description">
        <h1>Lorem, ipsum dolor.</h1>
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
        </article>
      </div>
      <GoogleMap
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        mapContainerClassName="itineray-list--item-map"
      >
        <MarkerF position={{ lat: 44, lng: -80 }}/>
      </GoogleMap>

    </div>
  );
};
export default ItineraryListItem;
