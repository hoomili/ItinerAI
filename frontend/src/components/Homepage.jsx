import React, {useState} from "react";
import axios from "axios";
require('dotenv').config(); 

function Homepage() {
  const [destination, setDestination] = useState("");
  const [numDays, setNumDays] = useState("");
  const [dailyBudget, setDailyBudget] = useState("");
  const [activities, setActivities] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Plan a trip to ${destination} for ${numDays} days with a daily budget of ${dailyBudget}. The traveler is interested in ${activities}.`;

    const data = {
      destination,
      days,
      budget,
      activities
    };
  

    const response = await axios.post('', data, {
      prompt,
      max_tokens: 500,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

 
  };

  return (
    <div>
      <h1>Welcome to ItinerAI!</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Destination:
          <input type="text" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <label>
          Number of Days:
          <input type="number" name="numDays" value={numDays} onChange={(e) => setNumDays(e.target.value)} />
        </label>
        <label>
          My Daily Budget:
          <input type="number" name="dailyBudget" value={dailyBudget} onChange={(e) => setDailyBudget(e.target.value)} />
        </label>
        <label>
          My Favourite Activities:
          <input type="text" name="activities" value={activities} onChange={(e) => setActivities(e.target.value)} />
        </label>
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}

export default Homepage;
