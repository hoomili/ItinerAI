import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./providers/AuthProvider";
import "./App.scss";
import Login from "./components/Login";
import RegisterNewUser from "./components/Register";
import Navbar from "./components/TopNavigationBar";
import Footer from "./components/Footer";
import "./App.scss";
import Homepage from "./components/Homepage";
import ItineraryList from "./components/ItineraryList";
import ItineraryListItem from "./components/itinerarylistitem";


function App() {
  const [aiData, setAiData] = useState(null);

  const { isLoggedIn, user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  console.log('user', user);


  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/my-itineraries" element={user && <ItineraryList userId={userId} selectedItinerary={selectedItinerary} setSelectedItinerary={setSelectedItinerary} />} />
          <Route path="/itinerary/:userId/:id" element={<ItineraryListItem aiData={aiData} userId={userId}/>} />
          <Route
            exact
            path="/"
            element={
              <>
                <Homepage setAiData={setAiData} />
                {aiData && <ItineraryListItem aiData={aiData} userId={userId} setSelectedItinerary={setSelectedItinerary}/>}
              </>
            }
          />
        </Routes>
      </div>
        <Footer />
    </Router>
  );
}

export default App;
