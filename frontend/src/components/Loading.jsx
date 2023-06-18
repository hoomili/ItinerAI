import { useState, useEffect } from "react";
import "../styles/loading.scss";
import { TypeAnimation } from 'react-type-animation';

const Loading = () => {

  // const [text, setText] = useState(textArr[0]);
  // const [index, setIndex] = useState(1);
  // const [charIndex, setCharIndex] = useState(0);
  // const [output, setOutput] = setOutput("")

  // useEffect(() => {
    // if (index < textArr.length) {
    //   const interval = setTimeout(() => {
    //     setTimeout(() => {
    //       for (let i = 0; i < textArr[index].length; i++) {
    //         setText((prev) => prev + textArr[index].charAt(charIndex));
    //         setCharIndex(charIndex + 1);
    //       }
    //       }, 50)
    //     setIndex(index + 1);
    //   }, 3000);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }
    // setText(textArr[textArr.length - 1]);
  // }, [text]);

  // return <h1 className="loader">{output}</h1>;


  return (
    <TypeAnimation 
    sequence={[
        "Generating your itinerary...",
        2000,
        "Reading your interests...",
        2000,
        "Checking your budget...",
        2000,
        "Generating key locations...",
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
