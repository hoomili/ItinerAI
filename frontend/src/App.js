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
  const [aiData, setAiData] = useState([]);

  const { isLoggedIn, user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

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
          <Route path="/my-itineraries" element={user && <ItineraryList userId={userId} />} />
          <Route path="/itinerary/:userId/:id" element={<ItineraryListItem aiData={aiData} />} />
          <Route
            exact
            path="/"
            element={
              <>
                <Homepage setAiData={setAiData} />
                {aiData.length > 0 && <ItineraryListItem aiData={aiData} />}
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
