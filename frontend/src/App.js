import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlantTracker from "./pages/PlantTracker";
import Plants from "./pages/Plants";
import HerbalRemedies from "./pages/HerbalRemedies";

function App() {
  return (
    <Router>
      {/* ✅ Navbar stays visible on all pages */}
      <Navbar />

      {/* ✅ Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<PlantTracker />} />
        <Route path="/remedies" element={<HerbalRemedies />} />
        <Route path="/plants/:category" element={<Plants />} />
      </Routes>
    </Router>
  );
}

export default App;
