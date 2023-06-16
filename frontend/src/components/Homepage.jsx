import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Homepage.scss";
import { ColorRing } from "react-loader-spinner";
import Autocomplete from "react-google-autocomplete";

function Homepage(props) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [numDays, setNumDays] = useState("");
  const [dailyBudget, setDailyBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // Track completion status

  // useEffect(() => {
  //   if (props.aiData.length > 0) {
  //     setIsCompleted(true); // Set completion status to true if aiData is available
  //   }
  // }, [props.aiData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsGenerating(true);
    setIsCompleted(false);

    axios
      .post("http://localhost:8080/api/completions", {
        city,
        country,
        numDays,
        dailyBudget,
        interests,
      })
      .then((response) => {
        console.log("API response:", response);
        props.setAiData([response.data]);
        setIsGenerating(false);
        setIsCompleted(true);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  return (
    <div className="homepage-container">
      {isCompleted ? (
        <>
          <h1 className="homepage-title">Itinerary Generated!</h1>
          <button
            type="button"
            className="homepage-submit"
            onClick={() => {
              setIsCompleted(false);
              setCity("");
              setCountry("");
              setNumDays("");
              setInterests("");
              setDailyBudget("");
            }}
          >
            Generate New Itinerary
          </button>
        </>
      ) : isGenerating ? (
        <>
          <h1 className="homepage-title">
            Generating your custom itinerary...
          </h1>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </>
      ) : (
        <>
          <h1 className="homepage-title">Tell us about your upcoming trip!</h1>
          <form onSubmit={handleSubmit} className="homepage-form">

            <label className="homepage-label">
              Destination:
              <Autocomplete 
              apiKey={process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY}
              placeholder=""
              className="homepage-input"
              onPlaceSelected={(place) => {
                setCity(place.address_components[0].long_name);
                setCountry(place.address_components[3].long_name)
              }}
              options={{
                types: ["(cities)"],
              }}
            />
            </label>
            <label className="homepage-label">
              Number of days:
              <input
                type="number"
                name="numDays"
                value={numDays}
                onChange={(e) => setNumDays(e.target.value)}
                className="homepage-input"
              />
            </label>
            <label className="homepage-label">
              My daily budget:
              <input
                type="number"
                name="dailyBudget"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="homepage-input"
              />
            </label>
            <label className="homepage-label">
              I'm interested in:
              <input
                type="text"
                name="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="homepage-input"
              />
            </label>
            <label>
              <input
                type="submit"
                value="Generate Itinerary"
                className="homepage-submit"
              />
            </label>
          </form>
        </>
      )}
    </div>
  );
}
export default Homepage;
