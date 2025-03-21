import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../images/bg.jpg"; // Ensure the correct path
import "./Home.css"; // Add this for styling

function Home() {
  const navigate = useNavigate();

  // Categories
  const categories = ["Ayurveda", "Yoga & Naturopathy", "Unani", "Siddha", "Homeopathy"];

  // Features Data
  const features = [
    {
      title: "Herbal Remedies",
      description: "Find natural remedies for various symptoms using medicinal plants.",
      link: "/remedies",
    },
    {
      title: "Plant Growth Tracker",
      description: "Monitor and track the growth of your medicinal plants over time.",
      link: "/tracker",
    },
    {
      title: "Plant Encyclopedia",
      description: "Learn about various medicinal plants, their uses, and benefits.",
      link: "/plant-encyclopedia",
    },
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            {Array.from("Welcome to AyurFlora: The Virtual Herbal Garden").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Explore medicinal plants, track their growth, and discover herbal remedies.
          </motion.p>
        </div>
      </div>
      {/* Categories Section */}
     
      <div className="categories-container">
        {categories.map((category) => (
          <motion.div
            key={category}
            onClick={() => navigate(`/plants/${category}`)}
            className="category-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.div>
        ))}
      </div>

      {/* Features Section with 3D Flip Cards */}
      <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "30px" ,textAlign: "center"}}>Explore Our Features</h2>
      <div className="features-container" style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {features.map((feature, index) => (
          <div key={index} className="flip-card" onClick={() => navigate(feature.link)}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{feature.title}</h3>
              </div>
              <div className="flip-card-back">
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Home;
