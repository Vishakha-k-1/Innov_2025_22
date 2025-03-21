import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Plants = () => {
  const { category } = useParams();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/plants/${category}`)
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
        {category} Plants
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {plants.length > 0 ? (
          plants.map((plant) => (
            <motion.div
              key={plant.name}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                background: "#fff",
                padding: "20px",
                textAlign: "center",
                transition: "0.3s",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={plant.image}
                alt={plant.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
              />
              <h2 style={{ fontSize: "1.5rem", marginTop: "10px" }}>{plant.name}</h2>
              <p><strong>Scientific Name:</strong> {plant.scientificName}</p>
              <p><strong>Benefits:</strong> {plant.benefits.join(", ")}</p>
            </motion.div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default Plants;
