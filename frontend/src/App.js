import { useState } from 'react';
import './App.scss';
import Homepage from './components/Homepage';
import ItineraryListItem from './components/itinerarylistitem';
import { pointsContext } from "./components/context";

function App() {
  const [aiData, setAiData] = useState([]);



  return (
    <div className="App">
      <h1>Project init</h1>
      <Homepage setAiData={setAiData}/>
      {aiData.length > 0 ? <ItineraryListItem aiData={aiData}/>: ''}

    </div>
  );
}

export default App;
