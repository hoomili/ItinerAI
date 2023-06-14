import React, { useState } from 'react';
import axios from 'axios';



function Homepage(props) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [numDays, setNumDays] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [interests, setInterests] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/completions', {
        city,
        country,
        numDays,
        dailyBudget,
        interests,
      })
      .then((response) => {
        console.log('API response:', response); // Log the generated text
        props.setAiData([response.data])
      })
      .catch((error) => {
        console.error('API error:', error); // Log the error
      });
  };

  return (
    <div>
      <h1>Welcome to ItinerAI!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Number of days:
          <input
            type="number"
            name="numDays"
            value={numDays}
            onChange={(e) => setNumDays(e.target.value)}
          />
        </label>
        <label>
          My daily budget:
          <input
            type="number"
            name="dailyBudget"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
          />
        </label>
        <label>
          I'm interested in:
          <input
            type="text"
            name="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </label>
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}

export default Homepage;
