import { useState, useEffect } from "react";
import "../styles/loading.scss";
import { TypeAnimation } from 'react-type-animation';

const Loading = () => {

  return (
    <TypeAnimation 
    sequence={[
        "Generating your itinerary...",
        2000,
        "Reading your interests...",
        2000,
        "Checking your budget...",
        2000,
        "Finding the best restaurants...",
        2000,
        "Sourcing a good hotel...",
        2000,
        "Putting it all together...",
        2000,
      ]}
      wrapper="span"
      speed={25}
      className="loader"
      repeat={0}
    />
  )

};
export default Loading;
